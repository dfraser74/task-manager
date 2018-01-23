import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, CircularProgress } from 'src/utils/material-ui/index.js';
import isEmail from 'validator/lib/isEmail';

import actionCreators from '../../actions/auth';
import './login.sass'


class LoginView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      doLogin: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    location: null,
    sending: false,
  };

  state = {
    sending: false
  }

  constructor(props) {
    super(props);

    this.email = "c.gamezinfantes@gmail.com";
    this.password = "holahola";
  }

  render() {
    let conditionalAttrButton = {};
    if (this.props.isAuthenticating) {
      conditionalAttrButton.icon = < CircularProgress size={22} />

      conditionalAttrButton.labelPosition = "before"
    }

    return (
      <div className="login">
        <div className="login__logo"></div>
        <TextField
          hintText="example@email.com"
          floatingLabelText="Email"
          defaultValue={this.email}
          fullWidth={true}
          errorText={this.state.emailError}
          onChange={this.validateEmail}
        />
        <TextField
          hintText="pass"
          floatingLabelText="Password"
          defaultValue={this.password}
          type="password"
          fullWidth={true}
          errorText={this.state.passWordError}
          onChange={this.validatePassword}
        />
        <RaisedButton
          label="Login"
          fullWidth={true}
          primary={true}
          onClick={this.onClickForm}
          className="login__button"
          {...conditionalAttrButton} />

        <div className="login__sign-up">Don't have an account? <strong>SIGN UP</strong></div>
      </div>
    );
  }

  onClickForm = () => {
    if (this.props.isAuthenticating) return;
    this.props.actions.doLogin(this.email, this.password);
  }

  validateEmail = (event, value) => {
    this.email = value;
    let emailError = ""

    if (!isEmail(this.email)) {
      emailError = "Must be an email"
    }

    if (this.email.lenght === 0)
      emailError = "Email is required"

      this.setState({ emailError })
  }

  validatePassword = (event, value) => {
    this.password = value;
    let passWordError = "";

    if (this.password.length === 0)
      passWordError = "Password is required"

    this.setState({ passWordError })
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.dispatch(replace('/'));
    }
  }

  extractRedirect = (string) => {
    const match = string.match(/next=(.*)/);
    return match ? match[1] : '/';
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
