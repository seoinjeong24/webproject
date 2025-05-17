function createAccount() {
  const username = document.getElementById("signup-username").value.trim();
  const id = document.getElementById("signup-id").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !id || !password) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const existingUser = localStorage.getItem(`user:${id}`);
  if (existingUser) {
    alert("이미 존재하는 ID입니다.");
    return;
  }

  localStorage.setItem(
    `user:${id}`,
    JSON.stringify({ username, id, password })
  );
  alert("회원가입이 완료되었습니다! 로그인 후 이용해주세요.");
  window.location.href = "login.html";
}

function navigateTo(path) {
  window.location.href = path;
}
