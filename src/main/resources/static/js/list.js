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
