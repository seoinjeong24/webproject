const today = new Date().toISOString().split("T")[0];
document.getElementById("date").min = today;

function navigateTo(path) {
  window.location.href = path;
}
document.getElementById("date").value = today;

//add-btn -> 데이터 전송
document.querySelector(".add-btn").addEventListener("click", async () => {
  const name = document.getElementById("list-name").value;
  const category = document.querySelector("select").value;
  const date = document.getElementById("date").value;

  if (!name || category === "none" || !date) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const response = await fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, category, expiryDate: date }),
  });

  if (response.ok) {
    alert("추가되었습니다.");

    const formattedDate = date.replace(/-/g, ".");
    const listContainer = document.querySelector(".list-container");

    if (listContainer) {
      const div = document.createElement("div");
      div.className = "list-item";

      div.innerHTML = `
        <i class="material-icons">star_border</i>
        <div class="item-text">
          <div class="storage-status ${category === 'freeze' ? 'frozen' : category}">${category === 'freeze' ? '냉동' : category}</div>
          <span class="name">${name}</span>
          <span class="expiry">~ ${formattedDate}</span>
        </div>
        <input type="checkbox" />
      `;

      listContainer.appendChild(div);
    }

    // 입력폼 초기화
    document.getElementById("list-name").value = "";
    document.querySelector("select").value = "none";
    document.getElementById("date").value = "";

    window.location.href = `/${category}`;

  } else {
    alert("추가에 실패했습니다.");
  }
});
