const today = new Date().toISOString().split("T")[0];
document.getElementById("date").min = today;

function navigateTo(path) {
  window.location.href = path;
}
document.getElementById("date").value = today;

//add
document.querySelector(".add-btn").addEventListener("click", function () {
    const name = document.getElementById("list-name").value.trim();
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!name || category === "none" || !date) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const item = { name, category, date };

    // 기존 데이터 불러오기
    const stored = localStorage.getItem("items");
    const items = stored ? JSON.parse(stored) : [];

    // 새 항목 추가
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    alert("추가되었습니다!");

    // 입력값 초기화
    document.getElementById("list-name").value = "";
    document.getElementById("category").value = "none";
    document.getElementById("date").value = "";
  });