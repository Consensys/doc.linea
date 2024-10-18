// src/components/RedirectPage.js
import React, { useEffect } from 'react';

export default function RedirectPage() {
  // Redirect the user to the new URL using HTML meta redirect.
  useEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://support.linea.build/linea-voyage/linea-surge/linea-surge-model.mdx';
    }, 0); // Redirect immediately.
  }, []);

  return (
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=https://support.linea.build/linea-voyage/linea-surge/linea-surge-model.mdx" />
      </head>
      <body>
        <p>If you are not redirected automatically, click <a href="https://support.linea.build/linea-voyage/linea-surge/linea-surge-model.mdx">here</a>.</p>
      </body>
    </html>
  );
}
