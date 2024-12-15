let menuBtn = document.querySelector(".menu-btn");
let main = document.querySelector("main");
let sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("small");
  main.classList.toggle("full");
});

let altMenuBtn = document.querySelector(".sidebar .alt-menu-btn");
//alt menu btn
altMenuBtn.addEventListener("click", () => {
  sidebar.classList.add("small");
  main.classList.add("full");
});
