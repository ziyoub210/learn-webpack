function loader(source) {
  console.log("loader2");
  return source;
}
loader.pitch = function () {
  // return 'loader2-pitch'
  console.log("loader2-pitch");
  return "loader";
};

module.exports = loader;
