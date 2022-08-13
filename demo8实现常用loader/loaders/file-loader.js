const loaderUtils = require("loader-utils");
function loader(source) {
  //file-loader需要返回路径
  const filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content: source,
  });
  this.emitFile(filename, source);
  return `module.exports="${filename}"`;
}
loader.raw = true; //二进制
module.exports = loader;
