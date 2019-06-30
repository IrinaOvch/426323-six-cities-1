import ProfileParser from '../../utils/profile-parser.js';

const initialState = {
  userProfile: null,
  isAuthenticated: null,
  error: null,
};

const ActionType = {
  UPDATE_USER_PROFILE: `UPDATE_USER_PROFILE`,
  ERROR_IN_AUTHENTICATION: `ERROR_IN_AUTHENTICATION`,
};

const ActionCreator = {
  updateUserProfile: (userProfile) => ({
    type: `UPDATE_USER_PROFILE`,
    payload: userProfile,
  }),
  setAuthenticationError: (error) => ({
    type: `ERROR_IN_AUTHENTICATION`,
    payload: error
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
      }).catch((error) => {
        dispatch(ActionCreator.setAuthenticationError(error));
      });
  },
  getLogin: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response) {
          dispatch(ActionCreator.updateUserProfile(ProfileParser.parseProfile(response.data)));
        } else {
          dispatch(ActionCreator.setAuthenticationError(`user is not authenticated`));
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `UPDATE_USER_PROFILE`: return Object.assign({}, state, {
      userProfile: action.payload,
      isAuthenticated: true
    });
    case `ERROR_IN_AUTHENTICATION`: return Object.assign({}, state, {
      isAuthenticated: false,
      error: action.payload
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
