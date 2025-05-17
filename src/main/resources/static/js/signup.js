function navigateTo(path) {
  window.location.href = path;
}

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = document.getElementById("signup-id").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!userId || !username || !password) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      userId: userId,
      username: username,
      password: password,
    }),
  })
    .then((res) => res.text())
    .then((msg) => alert(msg))
    .catch((err) => alert("에러 발생: " + err));
});
