import React from 'react';

const Link = props => (
  <a href="#" onClick={ev => ev.preventDefault()} {...props} />
);

export default Link;
