import OffersParser from '../../utils/offers-parser.js';
import ReviewsParser from '../../utils/review-parser.js';

const initialState = {
  offers: [],
  offersRequestLoaded: false,
  reviews: {},
  sortType: `Popular`,
  currentOffer: null,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_CURRENT_OFFER: `CHANGE_CURRENT_OFFER`,
  UPDATE_OFFER: `UPDATE_OFFER`,
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
  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType,
    };
  },
  changeCurrentOffer: (currentOffer) => {
    return {
      type: ActionType.CHANGE_CURRENT_OFFER,
      payload: currentOffer,
    };
  },
  updateOffer: (offer) => {
    return {
      type: ActionType.UPDATE_OFFER,
      payload: offer,
    };
  }
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
  },
  sendReview: (offerId, rating, comment) => (dispatch, _getState, api) => {
    return api.post(`/comments/${offerId}`, {
      rating,
      comment,
    }
    )
      .then((response) => {
        dispatch(ActionCreator.loadReviews({reviews: response.data.map((review) => {
          return ReviewsParser.parseReview(review);
        }), offerId}));
      });
  },
  updateFavorite: (offerId, status) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffer(OffersParser.parseOffer(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
        offersRequestLoaded: true,
      });
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: Object.assign({}, state.reviews, {
          [action.payload.offerId]: action.payload.reviews
        }),
      });
    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {
        sortType: action.payload,
      });
    case ActionType.CHANGE_CURRENT_OFFER:
      return Object.assign({}, state, {
        currentOffer: action.payload,
      });
    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => (offer.id === action.payload.id ? action.payload : offer))
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
