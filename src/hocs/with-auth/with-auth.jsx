import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withAuth = (isAuthenticated) => (Component) => {
  const WithAuth = (props) => {
    if (isAuthenticated === null) {
      return <div></div>;
    }
    if (!isAuthenticated) {
      return <Redirect to={`/login`} />;
    }
    return <Component {...props} />;
  };

  return WithAuth;
};

withAuth.propTypes = {
  isAuthenticated: PropTypes.bool
};


export default withAuth;
