#! /usr/bin/env node

//1.找到当前执行命令名的路径  拿到config.js

const path = require("path");
const config = require(path.resolve(__dirname, "../luckpack.config.js"));
const Compiler = require('../lib/compiler')
const compiler = new Compiler(config);
//运行编译
compiler.run();
