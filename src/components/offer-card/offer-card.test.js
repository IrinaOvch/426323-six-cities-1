import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

import offers from '../../mocks/offers.js'


it(`should render OfferCard correctly`, () => {
  const onTitleClickHandler = jest.fn();
  const onImageClickHandler = jest.fn();
  const mouseOverHandler = jest.fn();
const mouseLeaveHandler = jest.fn();

const card = renderer.create(
  <OfferCard
    offer={offers[0]}
    onOfferTitleClick={onTitleClickHandler}
    onOfferImageClick={onImageClickHandler}
    onMouseOver={mouseOverHandler}
    onMouseOut={mouseLeaveHandler}
  />
).toJSON();

expect(card).toMatchSnapshot();
});