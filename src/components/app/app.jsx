import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import Offer from '../../types/offer-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getCityOffers, getCity, getUserProfile, getSortType, getOffersRequestLoaded} from '../../reducer/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route} from 'react-router-dom';
import withAuth from '../../hocs/with-auth/with-auth.jsx';
import Favorites from '../favorites/favorites.jsx';
import OfferCardDetailed from '../offer-card-detailed/offer-card-detailed.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';

const App = (props) => {
  const {
    offers,
    leaflet,
    activeCity,
    onCityClick,
    userProfile,
    currentSortType,
    onChangeSortType,
    offersRequestLoaded,
  } = props;

  return <Switch>
    <Route
      exact
      path="/"
      render={() => offersRequestLoaded && offers.length === 0
        ? <MainPageEmpty onCityClick={onCityClick} activeCity={activeCity}/>
        : <MainPage
          leaflet={leaflet}
          offers={offers}
          activeCity={activeCity}
          onCityClick={onCityClick}
          userProfile={userProfile}
          currentSortType={currentSortType}
          onChangeSortType={onChangeSortType}
        />
      }></Route>
    <Route path="/login" component={SignIn}></Route>
    <Route path="/favorites" component={withAuth(userProfile)(Favorites)}></Route>
    <Route path="/offer/:id" render={(routeProps) => {
      return offers.length !== 0 && <OfferCardDetailed
        {...routeProps}
        leaflet={leaflet}
        offers={offers}
        activeCity={activeCity}
      />;
    }}></Route>
  </Switch>;
};

App.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  leaflet: PropTypes.object.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  currentSortType: PropTypes.string.isRequired,
  onChangeSortType: PropTypes.func.isRequired,
  offersRequestLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    activeCity: getCity(state),
    offers: getCityOffers(state),
    userProfile: getUserProfile(state),
    currentSortType: getSortType(state),
    offersRequestLoaded: getOffersRequestLoaded(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  onChangeSortType: (sortType) => dispatch(DataActionCreator.changeSortType(sortType))
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
