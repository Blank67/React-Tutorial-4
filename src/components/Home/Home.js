import React from 'react';

import Card from '../UI/Card/Card';
import css from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={css.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
