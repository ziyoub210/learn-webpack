import a, { add } from "./srouce.js";
console.log(a);

if (module.hot) {
  console.log(module.hot);
  module.hot.accept("./srouce.js", () => {
    console.log("srouce.js");
    console.log(add(1, 2));
  });
}
