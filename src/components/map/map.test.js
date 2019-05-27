import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map.jsx'
import offers from '../../mocks/offers.js';
import mapData from '../../mocks/map-data.js';
import leaflet from '../../mocks/leaflet.js';

it(`should render map correctly`, () => {
  const map = renderer.create(
    <Map
      offers={offers}
      mapData={mapData}
      leaflet={leaflet}
    />
  ).toJSON();

  expect(map).toMatchSnapshot();
});

