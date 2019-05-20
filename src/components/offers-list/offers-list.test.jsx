import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';

const mock = [
  {
    id: 1,
    title: `Beautiful & luxurious studio at great location`,
    img: `img/apartment-01.jpg`,
    price: 120,
    isPremium: true,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
  }, {
    id: 1,
    title: `Beautiful & luxurious studio at great location`,
    img: `img/apartment-01.jpg`,
    price: 120,
    isPremium: true,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
];

it(`Renders correctly`, () => {
  const offersList = renderer.create(
      <OffersList
        offers={mock}
      />
  ).toJSON;

  expect(offersList).toMatchSnapshot();
});
