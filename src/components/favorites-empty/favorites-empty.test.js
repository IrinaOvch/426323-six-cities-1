import React from 'react';
import renderer from 'react-test-renderer';

import FavoritesEmpty from './favorites-empty.jsx';

it(`should render FavoritesEmpty correctly`, () => {
  const page = renderer.create(
      <FavoritesEmpty/>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
