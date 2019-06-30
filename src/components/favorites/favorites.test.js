import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import {Favorites} from './favorites.jsx';
import offers from '../../mocks/offers.js';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render Favorites correctly`, () => {
  const userProfile = {
    id: 1,
    email: ``,
    name: ``,
    avatarUrl: ``,
    isPro: false,
  };
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const page = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites
            favorites={{'Paris': [offers[0]]}}
            loadFavorites={jest.fn()}
            userProfile={userProfile}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
