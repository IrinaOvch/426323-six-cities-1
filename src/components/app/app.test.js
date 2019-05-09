import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<App
    rentalObjects={[{title: `mockTitle`}]}
    onOfferTitleClick={jest.fn()}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
