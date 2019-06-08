import PropTypes from 'prop-types';

export default PropTypes.shape({
  city: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  title: PropTypes.string.isRequired,
  isInBookmarks: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.oneOf([`room`, `apartment`, `house`, `hotel`]),
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string.isRequired),
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
});
