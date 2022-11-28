import React from 'react';

import Navigation from './Navigation';
import css from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={css['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
