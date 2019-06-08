import React from 'react';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';
import reducer from '../../reducer/reducer.js';
import {Operation} from '../../reducer/data/data.js';
import {createAPI} from '../../api.js';

const mock = {
  offers,
  activeCity: `Paris`,
  handleCityClick: jest.fn()
};

it(`should render App correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  store.dispatch(Operation.loadOffers());
  const tree = renderer
  .create(<Provider store={store}>
    <App
      leaflet={leaflet}
      offers={mock.offers}
      activeCity={mock.activeCity}
      handleCityClick={mock.handleCityClick}
    />
  </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
