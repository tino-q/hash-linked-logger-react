import React from 'react';

import Img from './Img';
import Banner from './banner.png';

function Header() {
  return (
    <div>
      <Img src={Banner} alt="hash linked logger banner" />
    </div>
  );
}

export default Header;
