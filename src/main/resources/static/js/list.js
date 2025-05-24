// // 돋보기 버튼 클릭 시 검색 기능 실행
// document.getElementById("searchButton").addEventListener("click", searchItems); // 돋보기 버튼 클릭 시 검색 실행

function searchItems() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase(); // 검색어 가져오기
  const listItems = document.querySelectorAll(".list-item"); // 목록 항목들

  // 입력된 검색어에 맞는 항목만 필터링
  listItems.forEach((item) => {
    const itemText = item.querySelector(".name").textContent.toLowerCase(); // 항목 이름을 가져와 소문자로 변환

    // 검색어가 항목 이름에 포함되면 보이게, 아니면 숨기기
    if (itemText.includes(searchQuery)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function navigateTo(path) {
  window.location.href = path;
}
