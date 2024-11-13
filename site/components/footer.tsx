import React, { memo } from 'react';
import app from '@app/info';

import './footer.css';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="n-site-footer">
      <p>
        <a
          className="n-site-footer-link"
          href={app.repository?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {app.name}&nbsp;
        </a>
        Ⓒ {year} Made with ❤️‍🔥 by&nbsp;
        <a
          className="n-site-footer-link"
          href={app.author?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {app.author?.name}
        </a>
      </p>
    </footer>
  );
};

export default memo(Footer, () => true);
