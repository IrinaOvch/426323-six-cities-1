import React from 'react';
import renderer from 'react-test-renderer';

import SortingOption from './sorting-option.jsx';

it(`should render SortingOption correctly`, () => {
  const page = renderer.create(
      <SortingOption
        activeItem={true}
        sortingOption={`Popular`}
        onToggleDropdown={jest.fn()}
        onSelect={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
