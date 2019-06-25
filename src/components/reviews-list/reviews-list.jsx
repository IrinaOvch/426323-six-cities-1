import React from 'react';
import PropTypes from 'prop-types';

import ReviewItem from '../review-item/review-item.jsx';
import Review from '../../types/review-type.js';

const ReviewsList = (props) => {
  const {reviews} = props;
  return <ul className="reviews__list">
    {reviews.map((review) => <ReviewItem review={review} key={review.id} />)}
  </ul>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(Review)
};

ReviewsList.defaultProps = {
  reviews: []
};

export default ReviewsList;
