import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";
import Offer from "../../types/offer-type.js";

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
  offers: PropTypes.arrayOf(Offer).isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default OffersList;
