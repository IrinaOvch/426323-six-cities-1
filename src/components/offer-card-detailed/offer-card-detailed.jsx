import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";

import Map from '../map/map.jsx';
import Offer from '../../types/offer-type.js';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Review from '../../types/review-type.js';
import {ActionCreator as CitiesActionCreator} from '../../reducer/cities/cities.js';
import {getOffer, getReviews} from '../../reducer/selectors';
import {Operation} from '../../reducer/data/data.js';
import mapData from '../../mocks/map-data.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const AMOUNT_OF_NEARBY_OFFERS = 3;

const OffersListWrapper = withActiveItem()(OffersList);


class OfferCardDetailed extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getReviews(this.props.offerId);
    if (this.props.offer) {
      this.props.updateActiveCity(this.props.offer.city);
    }
  }

  render() {
    const {offer, reviews, offerId, activeCity, offers, leaflet} = this.props;
    if (offerId === 0) {
      return <Redirect to={`/`}/>;
    }
    const filteredOffers = offers.filter((currentOffer) => currentOffer.id !== offerId).slice(0, AMOUNT_OF_NEARBY_OFFERS);

    return <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images && offer.images.map((img, i) => {
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
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: (offer.rating * 10) * 2 + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
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
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                  <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                  <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                  <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                  <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                  <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </div>
                <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Map
          mapData={mapData}
          activeCity={activeCity}
          offers={filteredOffers}
          leaflet={leaflet}
          className={`property`}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersListWrapper offers={filteredOffers}/>
          </div>
        </section>
      </div>
    </main>;
  }
}

OfferCardDetailed.propTypes = {
  offer: Offer,
  offerId: PropTypes.number.isRequired,
  getReviews: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(Review),
  updateActiveCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  leaflet: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(Offer),
};

const validateNumber = (text) => {
  const regex = /^\d+$/;
  return text.match(regex);
};

const mapStateToProps = (state, ownProps) => {
  const number = Number(validateNumber(ownProps.match.params.id));

  return Object.assign({}, ownProps, {
    offer: getOffer(state, number),
    offerId: number,
    reviews: number !== 0 ? getReviews(state, number) : [],
  });
};

const mapDispatchToProps = (dispatch) => ({
  getReviews: (offerId) => dispatch(Operation.loadReviews(offerId)),
  updateActiveCity: (city) => dispatch(CitiesActionCreator.changeCity(city)),
});

export {OfferCardDetailed};

export default connect(mapStateToProps, mapDispatchToProps)(OfferCardDetailed);
