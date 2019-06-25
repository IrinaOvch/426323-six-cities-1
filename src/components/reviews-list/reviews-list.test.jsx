import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from './reviews-list.jsx';
import reviews from '../../mocks/reviews.js';

it(`should render ReviewsList correctly`, () => {
  const page = renderer.create(
      <ReviewsList
        reviews={reviews}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
