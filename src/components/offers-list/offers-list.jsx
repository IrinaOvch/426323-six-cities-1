import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

const OffersList = (props) => {
  const {offers, setActiveItem} = props;

  return <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, idx) => (
      <OfferCard
        offer={offer}
        key={idx}
        onMouseEnter={setActiveItem}
        onMouseLeave={setActiveItem}
      />
    ))}
  </div>;
};


OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isInBookmarks: PropTypes.bool.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default OffersList;
