import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

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
  },
]

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<App
    offers={mock}
    onOfferTitleClick={jest.fn()}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
