import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";

import Map from '../map/map.jsx';
import Offer from '../../types/offer-type.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Review from '../../types/review-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getOffer, getReviews, getUserProfile, getFormSendingState, getFormErrors, getCurrentOffer} from '../../reducer/selectors';
import {Operation} from '../../reducer/data/data.js';
import mapData from '../../mocks/map-data.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import Header from '../header/header.jsx';
import OfferCard from "../offer-card/offer-card.jsx";

const AMOUNT_OF_NEARBY_OFFERS = 3;
const MAX_IMAGES_PER_PAGE = 6;

const OffersListWrapper = withActiveItem()(OffersList);


class OfferCardDetailed extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
  }
  componentDidMount() {
    this.props.getReviews(this.props.offerId);
    if (!this.props.offer) {
      return;
    }

    this.props.updateActiveCity(this.props.offer.city);
  }

  handleBookmarkClick() {
    const {updateFavorite, offer} = this.props;
    updateFavorite(offer.id, !offer.isInBookmarks ? 1 : 0);
  }

  render() {
    const {isLoggedIn, userProfile, offer, reviews, offerId, activeCity, offers, leaflet, sendReview, isFormSending, errors} = this.props;
    if (offerId === 0) {
      return <Redirect to={`/`}/>;
    }
    const filteredOffers = offers.slice(0, AMOUNT_OF_NEARBY_OFFERS + 1);
    const nearbyOffers = offers.filter((currentOffer) => currentOffer.id !== offerId).slice(0, AMOUNT_OF_NEARBY_OFFERS);

    return <>
    <Header userProfile={userProfile}/>
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images && offer.images.slice(0, MAX_IMAGES_PER_PAGE).map((img, i) => {
              return <div className="property__image-wrapper" key={i}>
                <img className="property__image" src={img} alt="Photo studio"/>
              </div>;
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              offer.isPremium &&
             <div className="property__mark">
               <span>Premium</span>
             </div>
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button
                className={`property__bookmark-button button ${offer.isInBookmarks ? `property__bookmark-button--active` : ``}`}
                type="button"
                onClick={this.handleBookmarkClick}>
                <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: (Math.round(offer.rating) * 10) * 2 + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{Math.round(offer.rating)}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
            Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods && offer.goods.map((good) => {
                  return <li className="property__inside-item" key={good}>
                    {good};
                  </li>;
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host && offer.host.avatar} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offer.host && offer.host.name}
                </span>
                {offer.host && offer.host.isPro &&
                <span className="property__user-status">
              Pro
                </span>
                }
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews && this.props.reviews.length}</span></h2>
              <ReviewsList reviews={reviews}/>
              {isLoggedIn && (
                <ReviewForm
                  offerId={offerId}
                  sendReview={sendReview}
                  isFormSending={isFormSending}
                  errors={errors}
                />)}
            </section>
          </div>
        </div>
        <Map
          mapData={mapData}
          activeCity={activeCity}
          offers={filteredOffers}
          leaflet={leaflet}
          className={`property`}
          currentOfferId={offerId}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersListWrapper
              offers={nearbyOffers}
              cardComponent={OfferCard}
              className={`cities__places-list places__list tabs__content`}/>
          </div>
        </section>
      </div>
    </main>
    </>;
  }
}

OfferCardDetailed.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  offer: Offer,
  offerId: PropTypes.number.isRequired,
  getReviews: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(Review),
  updateActiveCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  leaflet: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(Offer),
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  sendReview: PropTypes.func.isRequired,
  errors: PropTypes.string,
  isFormSending: PropTypes.bool.isRequired,
  updateFavorite: PropTypes.func.isRequired,
  currentOffer: Offer,
  onChangeCurrentOffer: PropTypes.func.isRequired,
};

const validateNumber = (text) => {
  const regex = /^\d+$/;
  return text.match(regex);
};

const mapStateToProps = (state, ownProps) => {
  const number = Number(validateNumber(ownProps.match.params.id));

  return Object.assign({}, ownProps, {
    isLoggedIn: Boolean(getUserProfile(state)),
    userProfile: getUserProfile(state),
    offer: getOffer(state, number),
    offerId: number,
    reviews: number !== 0 ? getReviews(state, number) : [],
    isFormSending: getFormSendingState(state),
    errors: getFormErrors(state),
    currentOffer: getCurrentOffer(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  getReviews: (offerId) => dispatch(Operation.loadReviews(offerId)),
  updateActiveCity: (city) => dispatch(CitiesActionCreator.changeCity(city)),
  sendReview: (offerId, rating, comment) => dispatch(Operation.sendReview(offerId, rating, comment)),
  updateFavorite: (offerId, status) => dispatch(Operation.updateFavorite(offerId, status)),
  onChangeCurrentOffer: (currentOffer) => dispatch(DataActionCreator.changeCurrentOffer(currentOffer)),
});

export {OfferCardDetailed};

export default connect(mapStateToProps, mapDispatchToProps)(OfferCardDetailed);
