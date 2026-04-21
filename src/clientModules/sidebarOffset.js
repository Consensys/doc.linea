let rafId = null;

function updateSidebarOffset() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const bottom = navbar.getBoundingClientRect().bottom;
  document.documentElement.style.setProperty(
    "--sidebar-top",
    `${Math.max(bottom, 0)}px`,
  );
}

function scheduleUpdate() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    updateSidebarOffset();
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-announcement-bar-initially-dismissed"],
  });

  const init = () => {
    const bodyObserver = new MutationObserver(scheduleUpdate);
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    scheduleUpdate();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

export function onRouteDidUpdate() {
  scheduleUpdate();
}
