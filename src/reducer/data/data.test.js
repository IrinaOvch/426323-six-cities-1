import {ActionCreator, initialState, reducer} from './data.js';

describe(`Reducer works correctly`, () => {
  it(`should have initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should change city value `, () => {
    expect(reducer({
      offers: []
    }, {
      type: `LOAD_OFFERS`,
      payload: [`offer`]
    })).toEqual({
      offers: [`offer`],
      offersRequestLoaded: true
    });
  });
});

describe(`Action creator works correctly`, () => {
  it(`should check ActionCreator.loadOffers output`, () => {
    expect(ActionCreator.loadOffers([`offer`])).toEqual({
      type: `LOAD_OFFERS`,
      payload: [`offer`]
    });
  });
});

