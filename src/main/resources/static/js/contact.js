function submitForm() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!email || !message) {
    alert("메일 주소와 문의사항 입력란을 모두 채워주세요.");
    return;
  }

  alert("문의사항이 제출되었습니다.");

  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

function navigateTo(path) {
  window.location.href = path;
}
