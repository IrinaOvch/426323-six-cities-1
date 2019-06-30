import React from 'react';
import renderer from 'react-test-renderer';

import SortingOptions from './sorting-options.jsx';

it(`should render SortingOptions correctly`, () => {
  const page = renderer.create(
      <SortingOptions
        activeItem={true}
        onToggleDropdown={jest.fn()}
        onSelect={jest.fn()}
        currentSortType={`Popular`}
        isDropdownOpen={true}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
