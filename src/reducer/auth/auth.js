import ProfileParser from '../../utils/profile-parser.js';

const initialState = {
  isAuthorizationRequired: false,
  userProfile: null,
};

const ActionType = {
  CHANGE_AUTHORIZATION_REQUIREMENT: `CHANGE_AUTHORIZATION_REQUIREMENT`,
  UPDATE_USER_PROFILE: `UPDATE_USER_PROFILE`,
};

const ActionCreator = {
  changeAuthorizationRequirement: (newRequirement) => ({
    type: `CHANGE_AUTHORIZATION_REQUIREMENT`,
    payload: newRequirement,
  }),
  updateUserProfile: (userProfile) => ({
    type: `UPDATE_USER_PROFILE`,
    payload: userProfile,
  })
};

const Operation = {
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email,
      password,
    })
      .then((response) => {

        dispatch(ActionCreator.updateUserProfile(ProfileParser.parseProfile(response.data)));
        // const initialExpires = new Date(response.headers.expires);
        // const expires = new Date(initialExpires.getTime + 5 * 60000);
        // localStorage.setItem(`expires`, expires);
      }).catch(() => {
        // handle error
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_AUTHORIZATION_REQUIREMENT`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
    case `UPDATE_USER_PROFILE`: return Object.assign({}, state, {
      userProfile: action.payload,
    });
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
  initialState,
};
