import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';


import MainPage from './main-page.jsx';
import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render MainPage correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const page = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage
            offers={offers}
            leaflet={leaflet}
            onOfferTitleClick={jest.fn()}
            activeCity={`Paris`}
            onCityClick={jest.fn()}
            currentSortType={`Popular`}
            onChangeSortType={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
