import {ActionCreator, initialState, reducer} from './data.js';
import offers from '../../mocks/offers.js';

describe(`Reducer works correctly`, () => {
  it(`should have initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should load offers`, () => {
    expect(reducer({
      offers: []
    }, {
      type: `LOAD_OFFERS`,
      payload: [`offer`],
    })).toEqual({
      offers: [`offer`],
      offersRequestLoaded: true,
    });
  });

  it(`should load reviews`, () => {
    expect(reducer({
      reviews: {}
    }, {
      type: `LOAD_REVIEWS`,
      payload: {reviews: [`review`], offerId: 1},
    })).toEqual({
      reviews: {1: [`review`]},
    });
  });

  it(`should change sort type`, () => {
    expect(reducer({
      sortType: `popular`,
    }, {
      type: `CHANGE_SORT_TYPE`,
      payload: `not popular`,
    })).toEqual({
      sortType: `not popular`,
    });
  });

  it(`should change current offer`, () => {
    expect(reducer({
      currentOffer: offers[0],
    }, {
      type: `CHANGE_CURRENT_OFFER`,
      payload: offers[1],
    })).toEqual({
      currentOffer: offers[1],
    });
  });

  it(`should update offer`, () => {
    const payload = Object.assign({}, offers[1], {
      isInBookmarks: true,
    });
    expect(reducer({
      offers,
    }, {
      type: `UPDATE_OFFER`,
      payload,
    })).toEqual({
      offers: offers.map((offer) => (offer.id === payload.id ? payload : offer))
    });
  });
});

describe(`Action creator works correctly`, () => {
  it(`should check ActionCreator.loadOffers output`, () => {
    expect(ActionCreator.loadOffers([`offer`])).toEqual({
      type: `LOAD_OFFERS`,
      payload: [`offer`],
    });
  });

  it(`should check ActionCreator.loadReviews output`, () => {
    expect(ActionCreator.loadReviews({reviews: [`review`], offerId: 1})).toEqual({
      type: `LOAD_REVIEWS`,
      payload: {reviews: [`review`], offerId: 1},
    });
  });

  it(`should check ActionCreator.changeSortType output`, () => {
    expect(ActionCreator.changeSortType(`popular`)).toEqual({
      type: `CHANGE_SORT_TYPE`,
      payload: `popular`,
    });
  });

  it(`should check ActionCreator.changeCurrentOffer output`, () => {
    expect(ActionCreator.changeCurrentOffer(offers[0])).toEqual({
      type: `CHANGE_CURRENT_OFFER`,
      payload: offers[0],
    });
  });

  it(`should check ActionCreator.updateOffer output`, () => {
    expect(ActionCreator.updateOffer(offers[0])).toEqual({
      type: `UPDATE_OFFER`,
      payload: offers[0],
    });
  });
});

