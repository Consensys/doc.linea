function fixChangelogColor() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const targetColor = isDark ? "white" : "#190066";

  const changelogButtons = document.querySelectorAll(
    "button.navbar__link, " +
      ".navbar__item.dropdown button, " +
      ".navbar__item--dropdown button, " +
      'button[aria-label*="Changelog"], ' +
      ".navbar__items--right button",
  );

  changelogButtons.forEach((button) => {
    if (
      button.textContent.includes("Changelog") ||
      button.getAttribute("aria-label")?.includes("Changelog")
    ) {
      button.style.setProperty("color", targetColor, "important");
    }
  });
}

window.addEventListener("load", () => {
  setTimeout(fixChangelogColor, 100);
  setTimeout(fixChangelogColor, 500);
  setTimeout(fixChangelogColor, 1000);
  setTimeout(fixChangelogColor, 2000);
});

const observer = new MutationObserver(() => {
  fixChangelogColor();
});

observer.observe(document.documentElement, {
  attributes: true,
  childList: true,
  subtree: true,
});

setInterval(fixChangelogColor, 3000);
