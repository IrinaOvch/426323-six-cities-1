import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withAuth = (userProfile) => (Component) => {
  class WithAuth extends React.PureComponent {
    render() {
      const isLoggedIn = Boolean(userProfile);
      if (!isLoggedIn) {
        return <Redirect to={`/login`} />;
      }
      return Component;
    }
  }

  WithAuth.propTypes = {
    userProfile: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
    }),
  };

  return WithAuth;
};


export default withAuth;
