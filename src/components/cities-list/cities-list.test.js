import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx'

it(`should render CitiesList correctly`, () => {
  const page = renderer.create(
      <CitiesList
        activeItem={`Paris`}
        onCityClick={jest.fn()}
        onActiveItemSet={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
