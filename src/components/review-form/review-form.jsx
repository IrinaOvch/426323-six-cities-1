import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import withReview from '../../hocs/with-review/with-review.jsx';

const ratingOptions = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const ReviewForm = ({
  setRating,
  rating,
  onSubmitForm,
  setComment,
  comment,
  isSubmitDisabled,
  isFormSending,
  errors,
}) => {
  return <form
    className="reviews__form form"
    method="post"
    onSubmit={onSubmitForm}
  >
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {ratingOptions.map((option, i) => {
        const count = ratingOptions.length - i;
        return <Fragment key={i} >
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={count}
            id={`${count}-stars`}
            type="radio"
            checked={count === Number(rating)}
            onChange={setRating}
            disabled={isFormSending}
          />
          <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={option}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>;
      })}
    </div>
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      value={comment}
      onChange={setComment}
      disabled={isFormSending}
    >
    </textarea>
    {errors && (
      <span className="form__error">
        An error has occured: {errors}
        Please, try again later.
      </span>
    )}
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button
        className="reviews__submit form__submit button"
        type="submit"
        disabled={isSubmitDisabled}
      >Submit</button>
    </div>
  </form>;
};

ReviewForm.propTypes = {
  setRating: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setComment: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  isSubmitDisabled: PropTypes.bool,
  isFormSending: PropTypes.bool,
  errors: PropTypes.string,
};

export {ReviewForm};
export default withReview(ReviewForm);
