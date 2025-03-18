import React from 'react';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function ConnectWallet() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      marginLeft: '0.5rem' 
    }}>
      <DynamicWidget variant='dropdown' />
    </div>
  );
}
