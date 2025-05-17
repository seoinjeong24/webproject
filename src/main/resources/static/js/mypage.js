document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  if (!username || !userId) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  // 텍스트와 입력창에 값 표시
  document.getElementById("display-username").textContent = username;
  document.getElementById("username").value = username;
  document.getElementById("id").value = userId;
});

function navigateTo(path) {
  window.location.href = path;
}
