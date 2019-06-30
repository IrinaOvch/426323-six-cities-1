import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/auth/auth.js';
import {getCity, getUserProfile} from '../../reducer/selectors.js';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onLogin(this.props.email, this.props.password);
  }
  render() {
    const {location, email, onFormChange, password, activeCity, userProfile} = this.props;
    const isLoggedIn = Boolean(userProfile);

    if (isLoggedIn) {
      const pathName = location.state && location.state.previousPage ? location.state.previousPage : `/`;
      return <Redirect to={pathName} />;
    }
    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={this.handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" value={email} placeholder="Email" required onChange={onFormChange}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" value={password} placeholder="Password" required onChange={onFormChange}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link">
                <span>{activeCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  (Object.assign({}, ownProps, {
    activeCity: getCity(state),
    userProfile: getUserProfile(state),
  }));

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email, password) => dispatch(Operation.login(email, password)),
});

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
