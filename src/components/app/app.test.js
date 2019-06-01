import React from 'react';
import {Provider} from "react-redux";
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {createStore} from "redux";

import offers from '../../mocks/offers.js';
import leaflet from '../../mocks/leaflet.js';
import {reducer} from '../../reducer.js';

it(`should render App correctly`, () => {
  const store = createStore(reducer);
  const tree = renderer
  .create(<Provider store={store}>
    <App
      offers={offers}
      leaflet={leaflet}
      onOfferTitleClick={jest.fn()}
    />
  </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
