/**
 * Classifies code block containers as "large" or "small" by adding/removing
 * a data-large-block attribute based on rendered height.
 *
 * Large  (>= 80px): copy button anchors to the top-right corner.
 * Small  (<  80px): copy button is vertically centered (single/short blocks).
 */

const LARGE_THRESHOLD = 80; // px — container offsetHeight

function classifyCodeBlocks() {
  const containers = document.querySelectorAll('[class*="codeBlockContainer"]');
  containers.forEach((container) => {
    if (container.offsetHeight >= LARGE_THRESHOLD) {
      container.setAttribute("data-large-block", "");
    } else {
      container.removeAttribute("data-large-block");
    }
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", classifyCodeBlocks);
  } else {
    classifyCodeBlocks();
  }
  window.addEventListener("resize", classifyCodeBlocks);
}

// Docusaurus SPA lifecycle — re-classify after every route change
export function onRouteDidUpdate() {
  setTimeout(classifyCodeBlocks, 50);
}
