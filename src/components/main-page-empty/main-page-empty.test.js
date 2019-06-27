import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';


import MainPageEmpty from './main-page-empty.jsx';
import {createAPI} from '../../api.js';
import reducer from '../../reducer/reducer.js';

it(`should render MainPageEmpty correctly`, () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  const page = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageEmpty activeCity={`Paris`} onCityClick={jest.fn()}/>
        </MemoryRouter>
      </Provider>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
