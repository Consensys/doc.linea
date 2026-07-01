import React from "react";
import MDXComponents from "@theme-original/MDXComponents";

function ResponsiveTable(props) {
  return (
    <div className="linea-table-wrapper">
      <table {...props} />
    </div>
  );
}

export default {
  ...MDXComponents,
  table: ResponsiveTable,
};
