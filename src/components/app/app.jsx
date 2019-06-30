import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import Offer from '../../types/offer-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getCityOffers, getCity, getUserProfile, getSortType, getOffersRequestLoaded, getAuthenticatedState} from '../../reducer/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route} from 'react-router-dom';
import withAuth from '../../hocs/with-auth/with-auth.jsx';
import withLoginForm from '../../hocs/with-login-form/with-login-form.jsx';
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
    isAuthenticated,
  } = props;

  return <>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
        </symbol>
      </svg>
    </div>
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
            userProfile={userProfile}
            currentSortType={currentSortType}
            onChangeSortType={onChangeSortType}
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
  </>;
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
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    activeCity: getCity(state),
    offers: getCityOffers(state),
    userProfile: getUserProfile(state),
    currentSortType: getSortType(state),
    offersRequestLoaded: getOffersRequestLoaded(state),
    isAuthenticated: getAuthenticatedState(state)
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  onChangeSortType: (sortType) => dispatch(DataActionCreator.changeSortType(sortType))
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
