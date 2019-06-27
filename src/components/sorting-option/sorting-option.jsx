import React from 'react';
import PropTypes from "prop-types";

class SortingOption extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
  }

  sortBy() {
    const {onSelect, sortingOption, handleToggleDropdown} = this.props;

    onSelect(sortingOption);
    handleToggleDropdown();
  }

  render() {
    const {activeItem, sortingOption} = this.props;
    return <li
      className={`places__option ${ activeItem ? `places__option--active` : ``}`}
      tabIndex="0"
      onClick={this.sortBy}>
      {sortingOption}
    </li>;
  }
}

SortingOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.bool.isRequired,
  sortingOption: PropTypes.string.isRequired,
  handleToggleDropdown: PropTypes.func.isRequired,
};

export default SortingOption;
