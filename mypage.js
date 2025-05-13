function navigateTo(pageId) {
  const pages = [
    "favorites",
    "expiring",
    "all-items",
    "frozen",
    "refrigerated",
    "room-temp",
  ];
  pages.forEach((page) => {
    document.getElementById(page)?.classList.remove("active");
  });

  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
}

function navigateTo(path) {
  window.location.href = path;
}
