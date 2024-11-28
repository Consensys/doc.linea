import React from "react";
import { useLocation } from "@docusaurus/router";
import Admonition from "@theme/Admonition";

export default function ToolingCTA() {
  const location = useLocation();

  // Only show on pages that include "/tooling" in their path
  if (!location.pathname.includes("/tooling")) {
    return null;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Admonition type="info" title="Want to be featured here?">
        <p>
          Have you built a tool for Linea? Contribute to the docs to add it
          here! See our{" "}
          <a href="https://github.com/Consensys/doc.linea?tab=readme-ov-file#contribute">
            guide to contributing
          </a>
          .
        </p>
      </Admonition>
    </div>
  );
}
