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

function confirmLogout() {
  const result = confirm("로그아웃 하시겠습니까?");
  if (result) {
    // POST로 로그아웃 요청 보내기
    const form = document.createElement("form");
    form.method = "post";
    form.action = "/logout";
    document.body.appendChild(form);
    form.submit();
  }
}
