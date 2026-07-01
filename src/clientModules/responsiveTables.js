function wrapResponsiveTables() {
  const tables = document.querySelectorAll(".theme-doc-markdown table");

  tables.forEach((table) => {
    if (table.closest(".linea-table-wrapper")) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "linea-table-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wrapResponsiveTables);
  } else {
    wrapResponsiveTables();
  }
}

export function onRouteDidUpdate() {
  setTimeout(wrapResponsiveTables, 50);
}
