import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import Offer from '../../types/offer-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getCityOffers, getCity, getUserProfile, getSortType, getOffersRequestLoaded, getAuthenticatedState, getCurrentOffer} from '../../reducer/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route} from 'react-router-dom';
import withAuth from '../../hocs/with-auth/with-auth.jsx';
import withLoginForm from '../../hocs/with-login-form/with-login-form.jsx';
import Favorites from '../favorites/favorites.jsx';
import OfferCardDetailed from '../offer-card-detailed/offer-card-detailed.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import Layout from '../layout/layout.jsx';

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
    isAuthenticated,
    currentOffer,
  } = props;

  return <Layout userProfile={userProfile}>
    <Switch>
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
            currentSortType={currentSortType}
            onChangeSortType={onChangeSortType}
            currentOfferId={currentOffer && currentOffer.id}
          />
        }></Route>
      <Route path="/login" component={withLoginForm(SignIn)}></Route>
      <Route path="/favorites" component={withAuth(isAuthenticated)(Favorites)}></Route>
      <Route path="/offer/:id" render={(routeProps) => {
        return offers.length !== 0 && <OfferCardDetailed
          {...routeProps}
          leaflet={leaflet}
          offers={offers}
          activeCity={activeCity}
        />;
      }}></Route>
    </Switch>
  </Layout>;
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
  isAuthenticated: PropTypes.bool,
  currentOffer: Offer,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    activeCity: getCity(state),
    offers: getCityOffers(state),
    userProfile: getUserProfile(state),
    currentSortType: getSortType(state),
    offersRequestLoaded: getOffersRequestLoaded(state),
    isAuthenticated: getAuthenticatedState(state),
    currentOffer: getCurrentOffer(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  onChangeSortType: (sortType) => dispatch(DataActionCreator.changeSortType(sortType)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
