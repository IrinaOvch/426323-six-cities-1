import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import OffersList from './offers-list.jsx';
import offers from '../../mocks/offers.js';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render OffersList correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const offersList = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList
            offers={offers}
            handleActiveItemSet={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(offersList).toMatchSnapshot();
});
