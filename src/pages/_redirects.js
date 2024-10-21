import React from 'react';
import ExternalRedirect from '../components/externalRedirects';
import redirects from '../../scripts/redirects';

const RedirectsPage = () => {
  return <ExternalRedirect redirects={redirects} />;
};

export default RedirectsPage;
