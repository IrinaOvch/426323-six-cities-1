import React from "react";
import PropTypes from "prop-types";

class CityItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleCityClick = this.handleCityClick.bind(this);
  }

  handleCityClick() {
    this.props.onCityClick(this.props.city);
    this.props.onActiveItemSet(this.props.city);
  }

  render() {
    const {city, isActiveCity} = this.props;
    return (<li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActiveCity ? `tabs__item--active` : ``}`} onClick={this.handleCityClick}>
        <span>{city}</span>
      </a>
    </li>);
  }
}

CityItem.propTypes = {
  city: PropTypes.string.isRequired,
  isActiveCity: PropTypes.bool.isRequired,
  onCityClick: PropTypes.func.isRequired,
  onActiveItemSet: PropTypes.func.isRequired,
};

export default CityItem;
