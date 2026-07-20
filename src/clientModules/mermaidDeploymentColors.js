/**
 * Mermaid injects classDef/theme rules as `#svgId … !important`, which beats
 * normal stylesheet overrides. Force deployment-diagram node colors inline
 * after render so light/dark contrast stays correct.
 */

const PALETTE = {
  light: {
    core: { bg: "#3b0ea8", stroke: "#3b0ea8", text: "#ffffff" },
    other: { bg: "#ececff", stroke: "#9370db", text: "#121212" },
  },
  dark: {
    core: { bg: "#2a0a7a", stroke: "#8e5dff", text: "#ffffff" },
    other: { bg: "#1f2020", stroke: "#cccccc", text: "#f8f7f2" },
  },
};

function currentPalette() {
  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";
  return isDark ? PALETTE.dark : PALETTE.light;
}

function nodeKind(node) {
  if (node.classList.contains("core")) {
    return "core";
  }
  if (
    node.classList.contains("access") ||
    node.classList.contains("control") ||
    node.classList.contains("neutral")
  ) {
    return "other";
  }
  return null;
}

function applyDeploymentMermaidColors() {
  const palette = currentPalette();

  document.querySelectorAll(".mermaid-deployment").forEach((diagram) => {
    diagram.querySelectorAll("g.node").forEach((node) => {
      const kind = nodeKind(node);
      if (!kind) {
        return;
      }

      const colors = palette[kind];

      node
        .querySelectorAll("rect, .basic.label-container, .label-container")
        .forEach((shape) => {
          shape.style.setProperty("fill", colors.bg, "important");
          shape.style.setProperty("stroke", colors.stroke, "important");
        });

      node
        .querySelectorAll(".nodeLabel, span, foreignObject div, text, tspan")
        .forEach((el) => {
          el.style.setProperty("color", colors.text, "important");
          el.style.setProperty("-webkit-text-fill-color", colors.text, "important");
          if (el.tagName === "text" || el.tagName === "tspan") {
            el.style.setProperty("fill", colors.text, "important");
          }
        });
    });
  });
}

function scheduleApply() {
  // Mermaid + panzoom both delay DOM work; retry a few times.
  [200, 800, 1400].forEach((ms) => {
    setTimeout(applyDeploymentMermaidColors, ms);
  });
}

function watchColorMode() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        scheduleApply();
        break;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      scheduleApply();
      watchColorMode();
    });
  } else {
    scheduleApply();
    watchColorMode();
  }
}

export function onRouteDidUpdate() {
  scheduleApply();
}
