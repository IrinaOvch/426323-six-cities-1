import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';

const rentalObjects = [
  {
    title: `Beautiful &amp; luxurious apartment at great location`
  },
  {
    title: `Wood and stone place`
  },
  {
    title: `Canal View Prinsengracht`
  },
  {
    title: `Nice, cozy, warm big bed apartment`
  },
];

const init = () => {
  ReactDOM.render(
      <App rentalObjects={rentalObjects}/>,
      document.getElementById(`root`)
  );
};

init();
