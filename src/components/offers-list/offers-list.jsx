import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import Offer from "../../types/offer-type.js";
import {getCurrentOffer} from '../../reducer/selectors.js';
import {ActionCreator, Operation} from '../../reducer/data/data.js';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleOfferImageClick = this.handleOfferImageClick.bind(this);
    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
  }

  handleOfferImageClick(offer) {
    this.props.onChangeCurrentOffer(offer);
  }

  handleOfferTitleClick() {
    this.props.onChangeCurrentOffer(null);
  }

  handleBookmarkClick(offerId, status) {
    this.props.updateFavorite(offerId, status);
  }


  render() {
    const {offers, onActiveItemSet, cardComponent: CardComponent, className} = this.props;
    return <div className={className}>
      {offers.map((offer, i) => (
        <CardComponent
          offer={offer}
          key={i}
          onMouseEnter={onActiveItemSet}
          onMouseLeave={onActiveItemSet}
          onOfferImageClick={this.handleOfferImageClick}
          onOfferTitleClick={this.handleOfferTitleClick}
          onBookmarkClick={this.handleBookmarkClick}
        />
      ))}
    </div>;
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  onActiveItemSet: PropTypes.func.isRequired,
  onChangeCurrentOffer: PropTypes.func.isRequired,
  updateFavorite: PropTypes.func.isRequired,
  cardComponent: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    currentOffer: getCurrentOffer(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCurrentOffer: (currentOffer) => dispatch(ActionCreator.changeCurrentOffer(currentOffer)),
  updateFavorite: (offerId, status) => dispatch(Operation.updateFavorite(offerId, status)),
});

export {OffersList};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
