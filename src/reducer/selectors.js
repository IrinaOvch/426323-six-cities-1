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

export const getCityOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => offers.filter((offer) => offer.city === city)
);

export const getUserProfile = (state) => {
  return state[NAME_SPACE_AUTH].userProfile;
};

export const getAuthorizationRequirement = (state) => {
  return state[NAME_SPACE_AUTH].isAuthorizationRequired;
};
