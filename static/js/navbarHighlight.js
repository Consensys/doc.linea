function highlightNavbar() {
  const currentPath = window.location.pathname;

  const navbarItems = [
    {
      name: "Quickstart",
      url: "/developers/quickstart",
      match: function (currentPath) {
        return currentPath.startsWith("/developers/quickstart");
      },
    },
    {
      name: "Guides",
      url: "/developers/guides",
      match: function (currentPath) {
        return (
          currentPath.startsWith("/developers/guides") &&
          !currentPath.startsWith("/developers/guides/run-a-node")
        );
      },
    },
    {
      name: "Run a Node",
      url: "/developers/guides/run-a-node",
      match: function (currentPath) {
        // Match '/developers/guides/run-a-node' and any of its subdomains
        return currentPath.startsWith("/developers/guides/run-a-node");
      },
    },
    {
      name: "Architecture",
      url: "/architecture",
      match: function (currentPath) {
        return currentPath.startsWith("/architecture");
      },
    },
  ];

  const allLinks = document.querySelectorAll(".navbar__link");

  if (allLinks.length === 0) {
    return;
  }

  // First, remove 'aria-current' from all navbar links
  allLinks.forEach((link) => {
    link.removeAttribute("aria-current");
  });

  let matched = false;

  navbarItems.forEach((item) => {
    const link = document.querySelector(`a[href="${item.url}"]`);

    if (link && item.match(currentPath) && !matched) {
      link.setAttribute("aria-current", "page");
      matched = true; // Stop after the first match
    }
  });
}

// Listen to page load events
window.addEventListener("load", function () {
  highlightNavbar();
});

// Mutation observer to detect changes in the document body (useful for client-side routing)
const observer = new MutationObserver(() => {
  highlightNavbar();
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
