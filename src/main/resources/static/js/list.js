const searchInput = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-box i");

function filterItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  const items = document.querySelectorAll(".list-item");

  items.forEach((item) => {
    const name = item.querySelector(".name").textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? "flex" : "none";
  });
}

// 입력할 때 바로 검색
searchInput.addEventListener("input", filterItems);

// 아이콘 클릭 시 검색
searchIcon.addEventListener("click", filterItems);

function navigateTo(path) {
  window.location.href = path;
}

//삭제
document.addEventListener("DOMContentLoaded", function () {
  const deleteIcons = document.querySelectorAll(".material-icons");

  deleteIcons.forEach(function (icon) {
    if (icon.textContent === "delete") {
      icon.addEventListener("click", function () {
        const listItem = icon.closest(".list-item");
        if (listItem) {
          listItem.style.display = "none";
        }
      });
    }
  });
});

//즐겨찾기 (DB 사용 X)
document.addEventListener("DOMContentLoaded", function () {
  const starIcons = document.querySelectorAll(".material-icons");

  starIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      if (icon.textContent === "star_border") {
        icon.textContent = "star";
      } else if (icon.textContent === "star") {
        icon.textContent = "star_border";
      }
    });
  });
});

//체크 표시
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    ".list-item input[type='checkbox']"
  );

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const listItem = checkbox.closest(".list-item");
      listItem.classList.toggle("checked", checkbox.checked);
    });
  });
});

//사이드바 접힘&펼침
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector("aside");

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  });