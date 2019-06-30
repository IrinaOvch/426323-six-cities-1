import OffersParser from '../../utils/offers-parser.js';
import ReviewsParser from '../../utils/review-parser.js';

const initialState = {
  offers: [],
  offersRequestLoaded: false,
  reviews: {},
  isFormSending: false,
  errors: null,
  sortType: `Popular`,
  currentOffer: null,
  favorites: {},
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_CURRENT_OFFER: `CHANGE_CURRENT_OFFER`,
  UPDATE_OFFER: `UPDATE_OFFER`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  ERROR_LOADING_REVIEWS: `ERROR_LOADING_REVIEWS`,
  START_LOADING_REVIEWS: `START_LOADING_REVIEWS`,
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
  loadReviewsError: (error) => {
    return {
      type: ActionType.ERROR_LOADING_REVIEWS,
      payload: error
    };
  },

  startLoadingReviews: () => {
    return {
      type: ActionType.START_LOADING_REVIEWS
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
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
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
  },
  sendReview: (offerId, rating, comment) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.startLoadingReviews());
    return api.post(`/comments/${offerId}`, {
      rating,
      comment,
    })
      .then((response) => {
        dispatch(ActionCreator.loadReviews({reviews: response.data.map((review) => {
          return ReviewsParser.parseReview(review);
        }), offerId}));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadReviewsError(err.message));
      });
  },
  updateFavorite: (offerId, status) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffer(OffersParser.parseOffer(response.data)));
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorites(OffersParser.parseOffers(response.data)));
      });
  },
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
        isFormSending: false,
        reviews: Object.assign({}, state.reviews, {
          [action.payload.offerId]: action.payload.reviews
        }),
      });
    case ActionType.START_LOADING_REVIEWS:
      return Object.assign({}, state, {
        isFormSending: true,
        errors: null,
      });
    case ActionType.ERROR_LOADING_REVIEWS:
      return Object.assign({}, state, {
        isFormSending: false,
        errors: action.payload
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
    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload.reduce((acc, favorite) => {
          if (!acc[favorite.city]) {
            acc[favorite.city] = [];
          }
          acc[favorite.city].push(favorite);

          return acc;
        }, {}),
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
