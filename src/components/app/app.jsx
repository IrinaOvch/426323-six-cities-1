import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import Offer from '../../types/offer-type.js';
import {ActionCreator} from '../../reducer/cities/cities.js';
import {getCityOffers, getCity} from '../../reducer/selectors.js';

const App = (props) => {
  const {offers, leaflet, activeCity, handleCityClick} = props;

  return <MainPage
    leaflet={leaflet}
    offers={offers}
    activeCity={activeCity}
    handleCityClick={handleCityClick}
  />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  leaflet: PropTypes.object.isRequired,
  activeCity: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    activeCity: getCity(state),
    offers: getCityOffers(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  handleCityClick: (city) => dispatch(ActionCreator.changeCity(city)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App)
