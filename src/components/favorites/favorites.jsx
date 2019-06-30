import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation} from '../../reducer/data/data.js';
import {getFavorites} from '../../reducer/selectors.js';

import FavoritesList from "../favorites-list/favorites-list.jsx";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";

class Favorites extends PureComponent {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites} = this.props;

    return (
      <>
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
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    favorites: getFavorites(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch(Operation.loadFavorites()),
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
