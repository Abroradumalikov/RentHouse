// JavaScript kod
const menuBar = document.querySelector(".nav__left__menu");
const links = document.querySelector(".nav__likns__menu");

// Yangi overlay elementi yaratamiz
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

menuBar.addEventListener("click", () => {
  links.classList.toggle("active");
  overlay.classList.toggle("active1"); // Fon va xiralashtirishni ko'rsatish

  if (links.classList.contains("active")) {
    menuBar.src = "./img/icons/х.svg";
  } else {
    menuBar.src = "./img/icons/menu.svg";
  }
});
const num = document.querySelector(".nav__contact__num__text");
const email = document.querySelector(".nav__contact__email__text");
const imgnum = document.querySelector(".nav__contact__num__box__img");
const imgemail = document.querySelector(".nav__contact__email__box__img");

imgnum.addEventListener("click", () => {
  num.classList.toggle("num__text");

  if (email.classList.contains("num__text")) {
    email.classList.remove("num__text");
  }
});

imgemail.addEventListener("click", () => {
  email.classList.toggle("num__text");

  if (num.classList.contains("num__text")) {
    num.classList.remove("num__text");
  }
});
