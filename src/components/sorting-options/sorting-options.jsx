import React from 'react';
import PropTypes from "prop-types";

import SortingOption from '../sorting-option/sorting-option.jsx';

const SORTING_OPTIONS = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

class SortingOptions extends React.PureComponent {
  render() {
    const {currentSortType = `Popular`, onSelect, isDropdownOpen, onToggleDropdown} = this.props;
    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onToggleDropdown}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isDropdownOpen ? `places__options--opened` : ``}`}>
        {SORTING_OPTIONS.map((sortingOption) => (
          <SortingOption
            activeItem={sortingOption === currentSortType}
            sortingOption={sortingOption}
            key={sortingOption}
            onToggleDropdown={onToggleDropdown}
            onSelect={onSelect}/>
        ))}
      </ul>
    </form>;
  }
}

SortingOptions.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  onToggleDropdown: PropTypes.func.isRequired,
};

export default SortingOptions;
