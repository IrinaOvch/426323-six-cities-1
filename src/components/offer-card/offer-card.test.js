import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const mock = {
    id: 1,
    title: `Beautiful & luxurious studio at great location`,
    img: `img/apartment-01.jpg`,
    price: 120,
    isPremium: true,
    rating: 4,
    type: `Apartment`,
    isInBookmarks: false,
}


it(`Renders correctly`, () => {
  const onTitleClickHandler = jest.fn();
  const onImageClickHandler = jest.fn();
  const mouseOverHandler = jest.fn();
const mouseLeaveHandler = jest.fn();

const card = renderer.create(
  <OfferCard
    offer={mock}
    onOfferTitleClick={onTitleClickHandler}
    onOfferImageClick={onImageClickHandler}
    onMouseOver={mouseOverHandler}
    onMouseOut={mouseLeaveHandler}
  />
).toJSON();

expect(card).toMatchSnapshot();
});