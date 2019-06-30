import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

import {BASE_URL} from '../../api.js';

const Header = ({userProfile}) => {
  const isLoggedIn = Boolean(userProfile);

  const linkPath = isLoggedIn ? `/favorites` : {
    pathname: `/login`,
    state: {previousPage: window.location.pathname}
  };

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to={`/`}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={linkPath}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {isLoggedIn && userProfile.avatarUrl ? <img className="user__avatar" src={`${BASE_URL}${userProfile.avatarUrl}`}/> : ``}
                </div>
                {isLoggedIn && userProfile.email ? <span className="header__user-name user__name">{userProfile.email}</span> : <span className="header__login">Sign in</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
};

export default Header;
