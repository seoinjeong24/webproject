function navigateTo(path) {
  const target = event.target;
  const CardGrid = target.closest(".card-grid") !== null;

  if (CardGrid) {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (!username || !userId) {
      alert("로그인이 필요합니다.");
      window.location.href = "login.html";
      return;
    }
  }

  window.location.href = path;
}
