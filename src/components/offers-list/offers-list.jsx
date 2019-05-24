import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(offer) {
    this.setState({activeOffer: offer});
  }

  handleMouseOut() {
    this.setState({activeOffer: null});
  }

  render() {
    const {offers} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, idx) => (
        <OfferCard
          offer={offer}
          key={idx}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
      ))}
    </div>;
  }
}


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
  onOfferImageClick: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default OffersList;
