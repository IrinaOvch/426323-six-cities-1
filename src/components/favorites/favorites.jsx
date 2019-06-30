import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation} from '../../reducer/data/data.js';
import {getFavorites, getUserProfile} from '../../reducer/selectors.js';

import Header from "../header/header.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";

class Favorites extends PureComponent {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites, userProfile} = this.props;

    return (
      <>
        <Header userProfile={userProfile}/>
        {Object.values(favorites).length > 0 ? (
          <FavoritesList
            favorites={favorites}
          />
        ) : (
          <FavoritesEmpty />
        )}
      </>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    favorites: getFavorites(state),
    userProfile: getUserProfile(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch(Operation.loadFavorites()),
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
