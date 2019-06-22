import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';
import offers from '../../mocks/offers.js';

it(`should render OffersList correctly`, () => {
  const offersList = renderer.create(
      <OffersList
        offers={offers}
        handleActiveItemSet={jest.fn()}
      />
  ).toJSON();

  expect(offersList).toMatchSnapshot();
});
