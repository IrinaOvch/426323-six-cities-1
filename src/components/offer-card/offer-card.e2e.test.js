import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import OfferCard from './offer-card.jsx';
import {MemoryRouter} from 'react-router-dom';

import offers from '../../mocks/offers.js';

configure({adapter: new Adapter()});

it(`should call callback when clicking on offer image`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.cities__image-wrapper > a`).simulate(`click`);
  expect(handleOfferImageClick).toBeCalledTimes(1);
});

it(`should pass correct data to callback`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.cities__image-wrapper > a`).simulate(`click`);
  expect(handleOfferImageClick.mock.calls[0][0]).toBe(offers[0]);
});

it(`should call callback when clicking on title`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.place-card__name a`).simulate(`click`);
  expect(handleOfferTitleClick).toBeCalledTimes(1);
});

it(`should pass correct data to callback`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.place-card__name a`).simulate(`click`);
  expect(handleOfferTitleClick.mock.calls[0][0]).toBe(offers[0]);
});

it(`should call callback when clicking on bookmark`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.place-card__bookmark-button`).simulate(`click`);
  expect(onBookmarkClickHandler).toBeCalledTimes(1);
});

it(`should pass correct data to callback`, () => {
  const handleOfferTitleClick = jest.fn();
  const handleOfferImageClick = jest.fn();
  const handleMouseOver = jest.fn();
  const handleMouseOut = jest.fn();
  const onBookmarkClickHandler = jest.fn();

  const card = mount(
      <MemoryRouter>
        <OfferCard
          offer={offers[0]}
          onOfferTitleClick={handleOfferTitleClick}
          onOfferImageClick={handleOfferImageClick}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          onBookmarkClick={onBookmarkClickHandler}
        />
      </MemoryRouter>
  );

  card.find(`.place-card__bookmark-button`).simulate(`click`);
  expect(onBookmarkClickHandler.mock.calls[0][0]).toBe(offers[0].id, !offers[0].isInBookmarks ? 1 : 0);
});
