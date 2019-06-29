import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter} from 'react-router-dom';


import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {createAPI} from './api';
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as AuthOperation} from "./reducer/auth/auth.js";


const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__()
      ) : compose(applyMiddleware(thunk.withExtraArgument(api)))
  );
  store.dispatch(DataOperation.loadOffers());
  store.dispatch(AuthOperation.getLogin());
  // tests
  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <App
        leaflet={leaflet}
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
