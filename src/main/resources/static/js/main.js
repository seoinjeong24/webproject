function navigateTo(path) {
  const target = event.target;
  const isInSidebar = target.closest(".sidebar-subtitle") !== null;

  // sidebar-subtitle 내부일 경우만 로그인 확인
  if (isInSidebar) {
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
