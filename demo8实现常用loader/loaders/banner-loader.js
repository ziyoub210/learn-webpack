const fs = require("fs");
const loaderUtils = require("loader-utils");
function loader(source) {
  const options = loaderUtils.getOptions(this);
  const cb = this.async();
  if (options.filename) {
    fs.readFile(options.filename, "utf-8", function (err, data) {
      cb(err, `/**${data}**/${source}`);
    });
  } else {
    const str = options.text ? `/**${options.text}**/` : "";
    cb(null, str + source);
  }
  return source;
}

module.exports = loader;
