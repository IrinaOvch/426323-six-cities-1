import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

it(`renders correctly`, () => {
  const page = renderer.create(
      <MainPage
        rentalObjects={[{title: `mockTitle`}]}
        onOfferTitleClick={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
