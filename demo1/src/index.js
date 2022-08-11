// import 'core-js'
// import 'core-js/es/array/includes'
// import 'core-js/es/array'
import img from "./head.jpg";
import "./index.css";
console.log($);
console.log(1);
const fn = () => {
  const a = 3;
  console.log(a);
};
fn();

function* gen() {
  yield 1;
}

const data = {
  name: "chen",
};
const nData = {
  ...data,
  age: 10,
};

console.log(["aaa"].includes("aaa"));
console.log(gen().next());
class A {
  a = 1;
}
new A();

const image = new Image();
image.src = require("./head.jpg").default;

document.body.appendChild(image);
