import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import {OfferCardDetailed} from './offer-card-detailed.jsx';
import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render OfferCardDetailed correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const page = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCardDetailed
            offer={offers[0]}
            offers={offers}
            offerId={1}
            getReviews={jest.fn()}
            updateActiveCity={jest.fn()}
            activeCity={`Paris`}
            leaflet={leaflet}
            isLoggedIn={true}
            sendReview={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
