import {ActionCreator, initialState, reducer} from './cities.js';

describe(`Cities reducer works correctly`, () => {
  it(`should have initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should change city value `, () => {
    expect(reducer({
      city: `Paris`,
    }, {
      type: `CHANGE_CITY`,
      payload: `Amsterdam`
    })).toEqual({
      city: `Amsterdam`,
    });
  });
});

describe(`Action creator works correctly`, () => {
  it(`should check ActionCreator.changeCity output`, () => {
    expect(ActionCreator.changeCity(`Brussels`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Brussels`
    });
  });
});
