import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import OfferCard from "../offer-card/offer-card.jsx";
import Offer from "../../types/offer-type.js";
import {getCurrentOffer} from '../../reducer/selectors.js';
import {ActionCreator} from '../../reducer/data/data.js';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleOfferImageClick = this.handleOfferImageClick.bind(this);
    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
  }

  handleOfferImageClick(offer) {
    this.props.onChangeCurrentOffer(offer);
  }

  handleOfferTitleClick() {
    this.props.onChangeCurrentOffer(null);
  }


  render() {
    const {offers, handleActiveItemSet} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, idx) => (
        <OfferCard
          offer={offer}
          key={idx}
          onMouseEnter={handleActiveItemSet}
          onMouseLeave={handleActiveItemSet}
          onOfferImageClick={this.handleOfferImageClick}
          onOfferTitleClick={this.handleOfferTitleClick}
        />
      ))}
    </div>;
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  handleActiveItemSet: PropTypes.func.isRequired,
  onChangeCurrentOffer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    currentOffer: getCurrentOffer(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCurrentOffer: (currentOffer) => dispatch(ActionCreator.changeCurrentOffer(currentOffer)),
});

export {OffersList};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
