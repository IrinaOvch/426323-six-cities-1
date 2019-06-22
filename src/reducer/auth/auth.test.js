import {ActionCreator, initialState, reducer} from './auth.js';

describe(`Reducer works correctly`, () => {
  it(`should have initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should change authorization requirement`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
      userProfile: null,
    }, {
      type: `CHANGE_AUTHORIZATION_REQUIREMENT`,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
      userProfile: null,
    });
  });

  it(`should update user profile`, () => {
    const userProfile = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: false,
    };

    expect(reducer({
      isAuthorizationRequired: false,
      userProfile: null,
    }, {
      type: `UPDATE_USER_PROFILE`,
      payload: userProfile
    })).toEqual({
      isAuthorizationRequired: false,
      userProfile,
    });
  });
});

describe(`Action creator works correctly`, () => {
  it(`should check ActionCreator.changeAuthorizationRequirement output`, () => {
    expect(ActionCreator.changeAuthorizationRequirement(true)).toEqual({
      type: `CHANGE_AUTHORIZATION_REQUIREMENT`,
      payload: true
    });
  });

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
});
