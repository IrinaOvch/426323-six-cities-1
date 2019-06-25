import React from 'react';
import renderer from 'react-test-renderer';

import ReviewItem from './review-item.jsx';
import reviews from '../../mocks/reviews.js';

it(`should render ReviewItem correctly`, () => {
  const page = renderer.create(
      <ReviewItem
        review={reviews[0]}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
