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
      if (!res.ok) {
        throw new Error("아이디 또는 비밀번호가 틀렸습니다.");
      }
      return res.json();
    })
    .then((userData) => {
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData.userId);
      window.location.href = "mypage.html";
    })
    .catch((err) => alert("로그인 실패: " + err.message));
}
