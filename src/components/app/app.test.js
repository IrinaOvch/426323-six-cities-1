import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

import offers from '../../mocks/offers.js';

it(`should render App correctly`, () => {
  const tree = renderer
  .create(<App
    offers={offers}
    onOfferTitleClick={jest.fn()}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
