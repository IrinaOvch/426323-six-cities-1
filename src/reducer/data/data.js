import OffersParser from '../../utils/offers-parser.js';
import ReviewsParser from '../../utils/review-parser.js';

const initialState = {
  offers: [],
  reviews: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadReviews: ({reviews, offerId}) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: {reviews, offerId},
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(OffersParser.parseOffers(response.data)));
      });
  },
  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews({reviews: response.data.map((review) => {
          return ReviewsParser.parseReview(review);
        }), offerId}));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: Object.assign({}, state.reviews, {
          [action.payload.offerId]: action.payload.reviews
        }),
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  initialState,
  Operation,
  reducer,
};
