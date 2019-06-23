import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';


import MainPage from './main-page.jsx';
import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';

it(`should render MainPage correctly`, () => {
  const page = renderer.create(
      <MemoryRouter>
        <MainPage
          offers={offers}
          leaflet={leaflet}
          onOfferTitleClick={jest.fn()}
          activeCity={`Paris`}
          onCityClick={jest.fn()}
          onSignInClick={jest.fn()}
        />
      </MemoryRouter>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
