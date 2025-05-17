function submitForm() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!email || !message) {
    alert("Please fill in both email and message.");
    return;
  }

  // Here you can add your form submission logic (e.g., send data to a server or API)
  alert("Your message has been sent! Thank you for contacting us.");

  // Clear form fields after submission
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

function navigateTo(path) {
  window.location.href = path;
}
