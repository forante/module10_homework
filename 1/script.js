const btn = document.querySelector(".btn");
const icons = document.querySelectorAll(".btn__svg");

btn.addEventListener("click", () => {
  for (elem of icons) {
    elem.classList.toggle("push");
  }
});
