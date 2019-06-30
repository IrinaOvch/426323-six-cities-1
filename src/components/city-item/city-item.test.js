import React from 'react';
import renderer from 'react-test-renderer';

import CityItem from './city-item.jsx';

it(`should render CitiesItem correctly`, () => {
  const page = renderer.create(
      <CityItem
        city={`Paris`}
        onCityClick={jest.fn()}
        isActiveCity={true}
        onActiveItemSet={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
