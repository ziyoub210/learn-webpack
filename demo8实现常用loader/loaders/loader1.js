function loader(source) {
  console.log("loader1");
  return source;
}
loader.pitch = function () {
  // return 'loader1-pitch'
  console.log("loader1-pitch");
};

module.exports = loader;
