import "./assets/css/style.css";
import "./assets/scss/style.scss";
import logo from "./assets/images/logo.png";

console.log("just for config webpack");
// const h1 = document.querySelector(".red");
const h1 = document.getElementsByTagName("h1");
const divImg = document.createElement("div");
const img = document.createElement("img");
const body = document.getElementsByTagName("body")[0];

img.setAttribute("src", logo);
img.classList.add("img");
divImg.appendChild(img);
body.appendChild(divImg);

console.log(h1[0]);
h1[0].classList.add("red");
