import React from "react";
import PropTypes from "prop-types";
import Offer from "../../types/offer-type.js";
import {Link} from 'react-router-dom';

class OfferCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleOfferImageClick = this.handleOfferImageClick.bind(this);
    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
  }

  handleMouseOver() {
    this.props.onMouseEnter(this.props.offer);
  }

  handleMouseOut() {
    this.props.onMouseLeave();
  }

  handleOfferImageClick() {
    this.props.onOfferImageClick(this.props.offer);
  }

  handleOfferTitleClick() {
    this.props.onOfferTitleClick(this.props.offer);
  }

  handleBookmarkClick() {
    const {onBookmarkClick, offer} = this.props;
    onBookmarkClick(offer.id, !offer.isInBookmarks ? 1 : 0);
  }


  render() {
    const {offer} = this.props;

    return <article
      className="cities__place-card place-card"
      onMouseEnter={this.handleMouseOver}
      onMouseLeave={this.handleMouseOut}>
      {
        offer.isPremium &&
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a onClick={this.handleOfferImageClick}>
          <img className="place-card__image" src={offer.image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isInBookmarks ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={this.handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: (Math.round(offer.rating) * 10) * 2 + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} onClick={this.handleOfferTitleClick}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>;
  }

}

OfferCard.propTypes = {
  offer: Offer.isRequired,
  onOfferImageClick: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

OfferCard.defaultProps = {
  onOfferTitleClick: () => {},
  onOfferImageClick: () => {},
};

export default OfferCard;
