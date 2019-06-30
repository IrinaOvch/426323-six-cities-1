import React from 'react';
import PropTypes from 'prop-types';

import Offer from '../../types/offer-type.js';

import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import FavoritesOfferCard from '../favorites-offer-card/favorites-offer-card.jsx';

const OffersListWrapper = withActiveItem()(OffersList);

const FavoritesCityItem = ({city, offers}) => {
  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link">
          <span>{city}</span>
        </a>
      </div>
    </div>
    <OffersListWrapper
      offers={offers}
      className={`favorites__places`}
      cardComponent={FavoritesOfferCard}/>
  </li>;
};

FavoritesCityItem.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(Offer),
};

export default FavoritesCityItem;
