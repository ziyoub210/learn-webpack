import $ from "jquery";
import moment from "moment";
import "moment/locale/zh-cn";
console.log(1);
moment.locale("zh-cn");
const r = moment().format("dddd"); // 40 分钟前
console.log(r);
