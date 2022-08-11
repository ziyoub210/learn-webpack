const fs = require('fs')
const path = require('path')
const baylon = require('babylon')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const ejs = require('ejs')
const { SyncHook } = require('tapable')
//babellon 把源码转换为ast
//@babel/traverse 遍历ast接点
//@babel/types
//@babel/generator 将ast生成代码
module.exports = class Compiler {
    constructor(config) {
        this.config = config
        //入口文件
        this.entryId;
        this.modules = {}
        this.root = process.cwd();
        this.hooks = {
            entryOptions: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        //如果传递了 plugins 参数
        const plugins = config.plugins;
        if(Array.isArray(plugins) && plugins.length > 0) {
            plugins.forEach(plugin => {
                plugin.apply(this)
                
            })
            this.hooks.afterPlugins.call();
        }
    }
    run() {
        this.hooks.run.call();
        this.hooks.compile.call();
        this.buildModule(path.resolve(this.root, this.config.entry), true);
        this.hooks.afterCompile.call();
        this.emitFile();
        this.hooks.emit.call();
        this.hooks.done.call();
    }
    //创建模块间依赖关系
    buildModule(modulePath, isEntry) {
        let source = fs.readFileSync(modulePath, 'utf-8')
        //loader处理
        const rules = this.config.module.rules;
        rules.forEach(rule => {
            const {test, use} = rule;
            if(test.test(modulePath)) { //需要通过loader来转化
                while(loaderPath = use.pop()) {
                    const loader = require(loaderPath)
                    source =  loader(source)
                }
            }
        })
        const moduleName = './' + path.relative(this.root, modulePath)
        const {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName))
        if(isEntry) this.entryId = moduleName
        //依赖关系
        this.modules[moduleName] = sourceCode 
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        })
    }
    //解析源码
    parse(source, parentPath) {
        const ast = baylon.parse(source)
        const dependencies = [] //依赖数组
        traverse(ast, {
            CallExpression(p) { //require()执行
                const node = p.node //找到节点
                if(node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') //xxx.js
                    moduleName =path.join(parentPath , moduleName)
                    dependencies.push(moduleName)
                    node.arguments = [t.stringLiteral(moduleName)]

                }
            }
        })
        const sourceCode = generator(ast).code
        return {
            sourceCode, 
            dependencies
        }
    }
    //生成打包文件
    emitFile() {
        const outPath = path.join(this.config.output.path, this.config.output.filename)
        const templateStr = fs.readFileSync(path.resolve(__dirname, './main.ejs'), 'utf-8')
        const code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules,
        })
        this.assets = {}
        this.assets[outPath] = code
        fs.writeFileSync(outPath, code)

    }
}