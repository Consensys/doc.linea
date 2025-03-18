import React from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function Root({children}) {
  const {siteConfig} = useDocusaurusContext();
  const environmentId = siteConfig.customFields.dynamicEnvironmentId;

  if (!environmentId) {
    console.warn('DYNAMIC_ENVIRONMENT_ID is not set');
    return children;
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: environmentId,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
} 