import React from "react";
import PropTypes from "prop-types";

const OfferCard = (props) => {
  const {offer, onOfferImageClick, onOfferTitleClick, onMouseOver, onMouseOut} = props;

  const handleMouseOver = () => {
    onMouseOver(offer);
  };

  const handleClick = () => {
    onOfferImageClick(offer);
  };

  return <article
    className="cities__place-card place-card"
    onMouseOver={handleMouseOver}
    onMouseOut={onMouseOut}>
    {
      offer.isPremium &&
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
    }

    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={handleClick}>
        <img className="place-card__image" src={offer.img} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${offer.isInBookmarks ? `place-card__bookmark-button--active` : ``}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: (offer.rating * 10) * 2 + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={onOfferTitleClick}>{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isInBookmarks: PropTypes.bool.isRequired,
  }).isRequired,
  onOfferImageClick: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

OfferCard.defaultProps = {
  onOfferTitleClick: () => {},
  onOfferImageClick: () => {}
};

export default OfferCard;
