import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {OfferCardDetailed} from './offer-card-detailed.jsx';
import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';

it(`should render OfferCardDetailed correctly`, () => {
  const page = renderer.create(
      <MemoryRouter>
        <OfferCardDetailed
          offer={offers[0]}
          offers={offers}
          offerId={1}
          getReviews={jest.fn()}
          updateActiveCity={jest.fn()}
          activeCity={`Paris`}
          leaflet={leaflet}
        />
      </MemoryRouter>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
