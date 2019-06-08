import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';

it(`should render MainPage correctly`, () => {
  const page = renderer.create(
      <MainPage
        offers={offers}
        leaflet={leaflet}
        onOfferTitleClick={jest.fn()}
        activeCity={`Paris`}
        handleCityClick={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
