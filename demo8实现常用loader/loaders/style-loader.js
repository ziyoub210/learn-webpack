const loaderUtils = require("loader-utils");
function loader(source) {
  const script = `
        const style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
  return script;
}
// loader.pitch = function(remainingRequest) {
//     // console.log(remainingRequest);
//     console.log(loaderUtils.stringifyRequest(this, '!!'+remainingRequest))
//     const script = `
//         const style = document.createElement('style');
//         style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!'+remainingRequest)});
//         document.head.appendChild(style);
//     `
//     return script

// }
module.exports = loader;
