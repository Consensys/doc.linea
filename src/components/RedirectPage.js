import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const redirects = {
    '/users': 'https://support.linea.build/',
    '/users/move-funds': 'https://support.linea.build/bridging/how-to-bridge-to-linea',
    '/users/move-funds/bridge': 'https://support.linea.build/bridging/how-to-bridge-to-linea',
    '/users/move-funds/set-up-your-wallet': 'https://support.linea.build/getting-started/can-you-use-linea-with-metamask',
    '/users/move-funds/fund': 'https://support.linea.build/getting-started/how-to-buy-tokens-on-linea-using-metamask-portfolio',
    '/users/linea-voyage': 'https://support.linea.build/linea-voyage',
    '/users/linea-voyage/linea-surge/linea-surge-overview': 'https://support.linea.build/linea-voyage/linea-surge/linea-surge-overview',
    '/users/linea-voyage/linea-surge/linea-surge-model': 'https://support.linea.build/linea-voyage/linea-surge/linea-surge-model',
    '/users/linea-voyage/linea-surge': 'https://support.linea.build/linea-voyage/linea-surge',
    '/users/linea-voyage/lxp': 'https://support.linea.build/linea-voyage/lxp',
    // Add more paths as needed
};

export default function RedirectPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const redirectUrl = redirects[currentPath];

  useEffect(() => {
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 0); // Redirect immediately.
    }
  }, [redirectUrl]);
}