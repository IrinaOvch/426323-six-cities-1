import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import OffersList from './offers-list.jsx';
import offers from '../../mocks/offers.js';

it(`should render OffersList correctly`, () => {
  const offersList = renderer.create(
      <MemoryRouter>
        <OffersList
          offers={offers}
          handleActiveItemSet={jest.fn()}
        />
      </MemoryRouter>
  ).toJSON();

  expect(offersList).toMatchSnapshot();
});
