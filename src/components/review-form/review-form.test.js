import React from 'react';
import renderer from 'react-test-renderer';


import ReviewForm from './review-form.jsx';

it(`should render ReviewForm correctly`, () => {
  const page = renderer.create(
      <ReviewForm
        offerId={2}
        sendReview={jest.fn()}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
