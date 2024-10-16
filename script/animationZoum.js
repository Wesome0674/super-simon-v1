document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".transition-link");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.body.classList.add("zoom-out");
      const href = this.href;
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});
