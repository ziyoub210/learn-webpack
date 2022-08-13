import "./a.less";
import p from "./head.jpg";
const img = document.createElement("img");
img.src = p;
img.style.width = "200px";
document.body.append(img);
console.log(1);
class A {
  constructor() {
    this.name = "A";
  }
}
new A();
