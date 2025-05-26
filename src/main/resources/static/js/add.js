const today = new Date().toISOString().split("T")[0];
document.getElementById("date").min = today;

function navigateTo(path) {
  window.location.href = path;
}
document.getElementById("date").value = today;
