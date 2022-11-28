import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';

import css from './Navigation.module.css';

const Navigation = (props) => {

  const ctx = useContext(AuthContext);

  return (
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     return (
          <nav className={css.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        // )
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
