import React from 'react';
import PropTypes from "prop-types";

class SortingOption extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  handleSortBy() {
    const {onSelect, sortingOption, onToggleDropdown} = this.props;

    onSelect(sortingOption);
    onToggleDropdown();
  }

  render() {
    const {activeItem, sortingOption} = this.props;
    return <li
      className={`places__option ${ activeItem ? `places__option--active` : ``}`}
      tabIndex="0"
      onClick={this.handleSortBy}>
      {sortingOption}
    </li>;
  }
}

SortingOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.bool.isRequired,
  sortingOption: PropTypes.string.isRequired,
  onToggleDropdown: PropTypes.func.isRequired,
};

export default SortingOption;
