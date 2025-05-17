function navigateTo(path) {
  window.location.href = path;
}

function performLogin() {
  const userId = document.getElementById("login-id").value;
  const password = document.getElementById("login-password").value;

  if (!userId || !password) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      userId: userId,
      password: password,
    }),
  })
    .then((res) => {
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData.userId);

      window.location.href = "mypage.html";
    })
    .catch((err) => alert("로그인 실패: " + err.message));
}
