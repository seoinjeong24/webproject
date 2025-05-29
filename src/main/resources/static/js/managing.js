function navigateTo(path) {
  window.location.href = path;
}

//사이드바 접힘&펼침
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector("aside");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
