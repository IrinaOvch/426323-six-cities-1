import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ReviewItem from '../review-item/review-item.jsx';
import Review from '../../types/review-type.js';

const MAX_REVIEWS = 10;
const sortingFunction = (a, b) => moment(b.date) - moment(a.date);
const ReviewsList = (props) => {
  const {reviews} = props;
  return <ul className="reviews__list">
    {reviews.sort(sortingFunction)
      .slice(0, MAX_REVIEWS)
      .map((review) => <ReviewItem review={review} key={review.id} />)}
  </ul>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(Review)
};

ReviewsList.defaultProps = {
  reviews: []
};

export default ReviewsList;
