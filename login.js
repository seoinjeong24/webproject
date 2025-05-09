function performLogin() {
  const id = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!id || !password) {
    alert('ID와 비밀번호를 입력해주세요.');
    return;
  }

  const userData = localStorage.getItem(`user:${id}`);
  if (!userData) {
    alert('존재하지 않는 사용자입니다.');
    return;
  }

  const parsed = JSON.parse(userData);
  if (parsed.password !== password) {
    alert('비밀번호가 일치하지 않거나 사용자 정보가 잘못되었습니다.');
    return;
  }

  alert('로그인되었습니다!');
  localStorage.setItem('currentUser', id);
  window.location.href = '/';
}
