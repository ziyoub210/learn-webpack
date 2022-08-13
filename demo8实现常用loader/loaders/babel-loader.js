const babel = require("@babel/core");
const loaderUtils = require("loader-utils");
function loader(source) {
  const options = loaderUtils.getOptions(this);
  const cb = this.async();
  console.log(this.resourcePath.split("\\").pop());
  babel.transform(
    source,
    {
      ...options,
      sourceMaps: true,
      filename: this.resourcePath.split("\\").pop(),
    },
    function (err, result) {
      cb(err, result.code, result.map);
    }
  );
}

module.exports = loader;
