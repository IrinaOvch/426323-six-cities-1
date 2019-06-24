import React from 'react';
import renderer from 'react-test-renderer';

import {OfferCardDetailed} from './offer-card-detailed.jsx';
import offers from '../../mocks/offers.js';

it(`should render OfferCardDetailed correctly`, () => {
  const page = renderer.create(
      <OfferCardDetailed
        offer={offers[0]}
        offerId={1}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
