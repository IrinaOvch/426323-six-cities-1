import {createSelector} from 'reselect';

import NameSpace from './name-spaces';

const NAME_SPACE_CITIES = NameSpace.CITIES;
const NAME_SPACE_DATA = NameSpace.DATA;
const NAME_SPACE_AUTH = NameSpace.AUTH;


export const getCity = (state) => {
  return state[NAME_SPACE_CITIES].city;
};

const getOffers = (state) => {
  return state[NAME_SPACE_DATA].offers;
};

export const getReviews = (state, offerId) => {
  if (!state[NAME_SPACE_DATA].reviews) {
    return {};
  }
  return state[NAME_SPACE_DATA].reviews[offerId];
};

export const getOffer = (state, offerId) => {
  return getOffers(state).find((offer) => offer.id === offerId) || {};
};

export const getCurrentOffer = (state) => {
  return state[NAME_SPACE_DATA].currentOffer;
};

export const getCityOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => offers.filter((offer) => offer.city === city)
);

export const getUserProfile = (state) => {
  return state[NAME_SPACE_AUTH].userProfile;
};

export const getAuthenticatedState = (state) => {
  return state[NAME_SPACE_AUTH].isAuthenticated;
};

export const getSortType = (state) => {
  return state[NAME_SPACE_DATA].sortType;
};

export const getOffersRequestLoaded = (state) => {
  return state[NAME_SPACE_DATA].offersRequestLoaded;
};

export const getFavorites = (state) => {
  return state[NAME_SPACE_DATA].favorites;
};

export const getFormSendingState = (state) => {
  return state[NAME_SPACE_DATA].isFormSending;
};

export const getFormErrors = (state) => {
  return state[NAME_SPACE_DATA].errors;
};
