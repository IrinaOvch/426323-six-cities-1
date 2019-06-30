import React from 'react';
import PropTypes from 'prop-types';

import FavoritesCityItem from '../favorites-city-item/favorites-city-item.jsx';
import Offer from '../../types/offer-type.js';


const FavoritesList = ({favorites}) => {
  return <main className="page__main page__main--favorites">
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(favorites).map(([city, offers]) => (<FavoritesCityItem key={city} city={city} offers={offers}/>))}
        </ul>
      </section>
    </div>
  </main>;
};

FavoritesList.propTypes = {
  favorites: PropTypes.shape({
    'Paris': PropTypes.arrayOf(Offer),
    'Cologne': PropTypes.arrayOf(Offer),
    'Brussels': PropTypes.arrayOf(Offer),
    'Amsterdam': PropTypes.arrayOf(Offer),
    'Hamburg': PropTypes.arrayOf(Offer),
    'Dusseldorf': PropTypes.arrayOf(Offer),
  }),
};

export default FavoritesList;
