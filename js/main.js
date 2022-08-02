const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
};

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

//banner
const banner = document.querySelector("#banner");
const list = document.querySelector(".list");
let num = 0;
let wid = 0;
let timer;
let enableClick = true;

function createList(url) {}
