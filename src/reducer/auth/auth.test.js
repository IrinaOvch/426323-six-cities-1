import {ActionCreator, initialState, reducer} from './auth.js';

describe(`Reducer works correctly`, () => {
  it(`should have initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should update user profile`, () => {
    const userProfile = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: false,
    };

    expect(reducer({userProfile: null}, {
      type: `UPDATE_USER_PROFILE`,
      payload: userProfile
    })).toEqual({
      isAuthenticated: true,
      userProfile
    });
  });
});

it(`should update error`, () => {
  expect(reducer({error: null}, {
    type: `ERROR_IN_AUTHENTICATION`,
    payload: `Error #1`
  })).toEqual({
    isAuthenticated: false,
    error: `Error #1`
  });
});

describe(`Action creator works correctly`, () => {
  it(`should check ActionCreator.updateUserProfile output`, () => {
    const userProfile = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: false,
    };
    expect(ActionCreator.updateUserProfile(userProfile)).toEqual({
      type: `UPDATE_USER_PROFILE`,
      payload: userProfile
    });
  });

  it(`should check ActionCreator.setAuthenticationError output`, () => {
    expect(ActionCreator.setAuthenticationError(`Error #1`)).toEqual({
      type: `ERROR_IN_AUTHENTICATION`,
      payload: `Error #1`
    });
  });
});
