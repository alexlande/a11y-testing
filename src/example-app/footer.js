import React from 'react';

import Link from './link';

const year = new Date().getFullYear();

const Footer = ({ toggleControlPanel }) => (
  <footer className="black-60 f6" role="contentinfo">
    <p className="mb3">
      This is a serious venture and not a joke at all. If you are a frog who is
      interested in the greatest scientific experiment of all time,{' '}
      <Link className="link dark-green hover-black b">sign up</Link> today!
    </p>

    <button
      onClick={toggleControlPanel}
      className="mb3 b dark-green hover-black"
    >
      Toggle Control Panel
    </button>

    <p>© {year} Ribbit</p>
  </footer>
);

export default Footer;
