import ProfileParser from '../../utils/profile-parser.js';

const initialState = {
  userProfile: null,
};

const ActionType = {
  UPDATE_USER_PROFILE: `UPDATE_USER_PROFILE`,
};

const ActionCreator = {
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
      }).catch(() => {
        // handle error
      });
  },
  getLogin: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.updateUserProfile(ProfileParser.parseProfile(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
