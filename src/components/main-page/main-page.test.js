import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

import offers from '../../mocks/offers.js';

it(`should render MainPage correctly`, () => {
  const page = renderer.create(
      <MainPage
        offers={offers}
        onOfferTitleClick={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
