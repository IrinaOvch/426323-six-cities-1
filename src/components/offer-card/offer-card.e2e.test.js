import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';

import offers from '../../mocks/offers.js'

configure({adapter: new Adapter()});

it(`should call callback when clicking on offer image`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();

  const card = mount(
      <OfferCard
        offer={offers[0]}
        onOfferTitleClick={handleOfferTitleClick}
        onOfferImageClick={handleOfferImageClick}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      />
  );

  card.find(`.cities__image-wrapper > a`).simulate(`click`);
  expect(handleOfferImageClick).toBeCalledTimes(1);
});

it(`should pass correct data to callback`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();

  const card = mount(
      <OfferCard
        offer={offers[0]}
        onOfferTitleClick={handleOfferTitleClick}
        onOfferImageClick={handleOfferImageClick}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      />
  );

  card.find(`.cities__image-wrapper > a`).simulate(`click`);
  expect(handleOfferImageClick.mock.calls[0][0]).toBe(offers[0]);
});
