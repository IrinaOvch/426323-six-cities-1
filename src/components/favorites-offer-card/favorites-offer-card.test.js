import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import FavoritesOfferCard from './favorites-offer-card.jsx';
import offers from '../../mocks/offers.js';

it(`should render FavoritesOfferCard correctly`, () => {
  const page = renderer.create(
      <MemoryRouter>
        <FavoritesOfferCard
          onBookmarkClick={jest.fn()}
          onMouseEnter={jest.fn()}
          onMouseLeave={jest.fn()}
          offer={offers[0]}
        />
      </MemoryRouter>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
