import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import Map from './map.jsx'
import offers from '../../mocks/offers.js';
import mapData from '../../mocks/map-data.js';
import leaflet from '../../mocks/leaflet.js';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render map correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const map = renderer.create(
      <Provider store={store}>
        <Map
          offers={offers}
          mapData={mapData}
          leaflet={leaflet}
          activeCity={`Paris`}
          className={`property`}
        />
      </Provider>
  ).toJSON();

  expect(map).toMatchSnapshot();
});

