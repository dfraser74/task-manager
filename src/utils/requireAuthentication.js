import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';


class PrivateRouteContainer extends React.Component {
  render() {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated
            ? <Component {...props} />
            : (
              <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            )
        }
      />
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(PrivateRouteContainer)
