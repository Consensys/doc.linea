function highlightNavbar() {
  console.log("Highlighting Navbar");

  const currentPath = window.location.pathname;
  console.log("Current Path:", currentPath);

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
  console.log("All Links Found:", allLinks);

  if (allLinks.length === 0) {
    console.error("No navbar links found.");
    return;
  }

  // First, remove 'aria-current' from all navbar links
  allLinks.forEach((link) => {
    link.removeAttribute("aria-current");
    console.log("Removed aria-current from:", link);
  });

  let matched = false;

  navbarItems.forEach((item) => {
    const link = document.querySelector(`a[href="${item.url}"]`);
    console.log("Checking Link:", link);

    if (link && item.match(currentPath) && !matched) {
      console.log("Matching Link Found:", link);
      link.setAttribute("aria-current", "page");
      matched = true; // Stop after the first match
    }
  });

  if (!matched) {
    console.log("No matching navbar link for the current path.");
  }
}

// Listen to page load events
window.addEventListener("load", function () {
  console.log("Navbar Highlight Script Loaded");
  highlightNavbar();
});

// Mutation observer to detect changes in the document body (useful for client-side routing)
const observer = new MutationObserver(() => {
  console.log("Page content changed, re-running highlightNavbar");
  highlightNavbar();
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
