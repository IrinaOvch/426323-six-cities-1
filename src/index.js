import {createStore} from "redux";
import {Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';

import App from './components/app/app.jsx';
import offers from './mocks/offers.js'
import {reducer} from "./reducer.js";



const init = () => {
  const store = createStore(reducer);
  ReactDOM.render(<Provider store={store}>
        <App
          offers={offers}
          leaflet={leaflet}
        />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
