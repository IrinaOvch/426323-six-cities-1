import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const commentLength = {
  MIN: 50,
  MAX: 300
};

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``
      };

      this._setRating = this._setRating.bind(this);
      this._setComment = this._setComment.bind(this);
      this._onSubmitForm = this._onSubmitForm.bind(this);
    }

    _setRating(evt) {
      this.setState({rating: evt.target.value});
    }

    _setComment(evt) {
      const comment = evt.target.value;

      if (comment.length > commentLength.MAX) {
        return;
      }

      this.setState({
        comment
      });
    }

    _resetReview() {
      this.setState({
        rating: 0,
        comment: ``
      });
    }

    _onSubmitForm(evt) {
      evt.preventDefault();
      const {rating, comment} = this.state;
      const {offerId} = this.props;
      this.props.sendReview(offerId, rating, comment);
      this._resetReview();
    }

    render() {
      const {comment, rating} = this.state;
      const isSubmitDisabled = !rating || comment.length < commentLength.MIN;
      return (
        <Component
          {...this.props}
          isSubmitDisabled={isSubmitDisabled}
          rating={rating}
          comment={comment}
          setRating={this._setRating}
          setComment={this._setComment}
          onSubmitForm={this._onSubmitForm}
        />
      );
    }
  }

  WithReview.propTypes = {
    offerId: PropTypes.number,
    sendReview: PropTypes.func.isRequired
  };

  return WithReview;
};

export default withReview;
