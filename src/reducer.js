import offers from './mocks/offers.js';

const initialState = {
  city: `Paris`,
  offers,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload,
    });

    default: return state;
  }
};

export {
  ActionCreator,
  reducer,
  initialState,
};
