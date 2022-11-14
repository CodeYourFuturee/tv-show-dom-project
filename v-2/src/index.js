import "./assets/css/style.css";

console.log("just for config webpack");
// const h1 = document.querySelector(".red");
const h1 = document.getElementsByTagName("h1");
console.log(h1[0]);
h1[0].classList.add("red");
