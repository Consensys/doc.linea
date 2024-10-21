import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

const ExternalRedirect = ({ redirects }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;

  useEffect(() => {
    const redirectUrl = redirects[currentPath];
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [currentPath, redirects]);

  return null;
};

export default ExternalRedirect;
