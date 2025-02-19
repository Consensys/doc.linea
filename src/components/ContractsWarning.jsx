import React from "react";
import { useLocation } from "@docusaurus/router";
import Admonition from "@theme/Admonition";

export default function ContractsWarning() {
  const location = useLocation();

  // Only show on relevant pages
  if (!location.pathname.includes("/api/linea-smart-contracts")) {
    return null;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <Admonition type="warning" title="Contributions not accepted">
        These reference pages are automatically generated based on Linea's {" "}
        <a href="https://github.com/Consensys/linea-monorepo/tree/main/contracts/src">smart contracts
        </a>
        .
        To ensure they accurately match the deployed smart contracts, we cannot accept any 
        contributions that edit these pages.
      </Admonition>
    </div>
  );
}
