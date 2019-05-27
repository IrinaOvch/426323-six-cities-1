import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';

it(`should render App correctly`, () => {
  const tree = renderer
  .create(<App
    offers={offers}
    leaflet={leaflet}
    onOfferTitleClick={jest.fn()}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
