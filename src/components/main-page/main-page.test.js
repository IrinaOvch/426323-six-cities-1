import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

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
  },{
    id: 1,
    title: `Beautiful & luxurious studio at great location`,
    img: `img/apartment-01.jpg`,
    price: 120,
    isPremium: true,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
]

it(`renders correctly`, () => {
  const page = renderer.create(
      <MainPage
        offers={mock}
        onOfferTitleClick={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
