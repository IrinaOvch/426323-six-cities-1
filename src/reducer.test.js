import {ActionCreator, reducer, initialState} from './reducer.js'

describe(`Reducer works correctly`, () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should change city value ', () => {
    expect(reducer({
      city: `Paris`,
      offers: []
    },{
      type: `CHANGE_CITY`,
      payload: `Amsterdam`
    })).toEqual({
      city: `Amsterdam`,
      offers: []
    });
  });
});

describe('Action creator works correctly', () => {
  it('should check ActionCreator.changeCity output', () => {
    expect(ActionCreator.changeCity(`Brussels`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Brussels`
    });
  });
});