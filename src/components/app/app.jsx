import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import Offer from '../../types/offer-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {ActionCreator as AuthActionCreator} from '../../reducer/auth/auth.js';
import {getCityOffers, getCity, getUserProfile, getAuthorizationRequirement} from '../../reducer/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';

const App = (props) => {
  const {offers, leaflet, activeCity, onCityClick, isAuthorizationRequired, userProfile, onSignInClick} = props;

  return isAuthorizationRequired ? <SignIn/> : <MainPage
    leaflet={leaflet}
    offers={offers}
    activeCity={activeCity}
    onCityClick={onCityClick}
    userProfile={userProfile}
    onSignInClick={onSignInClick}
  />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  leaflet: PropTypes.object.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    activeCity: getCity(state),
    offers: getCityOffers(state),
    isAuthorizationRequired: getAuthorizationRequirement(state),
    userProfile: getUserProfile(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  onSignInClick: () => dispatch(AuthActionCreator.changeAuthorizationRequirement(true)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
