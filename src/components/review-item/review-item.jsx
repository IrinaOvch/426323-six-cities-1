import React from 'react';
import Review from '../../types/review-type.js';
import moment from 'moment';

const ReviewItem = (props) => {
  const {review} = props;
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {review.user.name}
      </span>
      {review.user.isPro &&
        <span className="property__user-status">
          Pro
        </span>
      }
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: (Math.round(review.rating) * 10) * 2 + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={moment(review.date).format(`YYYY-MM-DD`)}>{moment(review.date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  review: Review,
};

export default ReviewItem;
