import React from 'react';

import FrogIcon from './icons/frog';
import Link from './link';
import Search from './search';

const NavItem = ({ children }) => (
  <li className="ml4">
    <Link className="db b f6 white no-underline">{children}</Link>
  </li>
);

const Header = ({ formLabels }) => (
  <header
    role="banner"
    className="bg-dark-green white pt3 pb3 pl5 pr5 flex items-center"
  >
    <div className="flex items-center flex-auto">
      <Link className="db white" aria-label="Ribbit">
        <FrogIcon />
      </Link>
      <nav role="navigation">
        <ul className="flex">
          <NavItem>Home</NavItem>
          <NavItem>Discussions</NavItem>
          <NavItem>Photos</NavItem>
        </ul>
      </nav>
    </div>
    <Search formLabels={formLabels} />
  </header>
);

export default Header;
