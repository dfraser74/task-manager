
import React, { Component } from 'react'
import { AppBar, ListItem, Checkbox, IconButton } from 'src/utils/material-ui/index.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import { goBack } from 'react-router-redux';
import AuthActions from '../../actions/auth'


class Settings extends Component {
  state = {
    notificationsAllowed: false,
  }

  render = () => (
    <div>
      <AppBar title="Settings"
        iconElementLeft={
          <IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>
        } />
      <div>
        <div>
          <ListItem
            leftCheckbox={
              <Checkbox onCheck={this.onClickNotifications} checked={this.state.notificationsAllowed} />
            }
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            onClick={this.onClickLogout}
            primaryText="Logout"
          />
        </div>
      </div>
    </div>
  )
  
  componentDidMount() {
    this.setState({ notificationsAllowed: this.notificationsAllowed()})
  }

  onClickNotifications = () => {
    this.requestNotificationPermission();
  }

  onClickBack = () => {
    this.props.dispatch(goBack())
  }

  onClickLogout = () => {
    this.props.actions.authLogoutAndRedirect();
  }

  requestNotificationPermission() {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "denied") {
      Notification.requestPermission(permission => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification("Hi there!");
          this.setState({ notificationsAllowed: this.notificationsAllowed() })
        }
      });
    }
  }

  notificationsAllowed = () => {
    if (!("Notification" in window)) return false;
    return Notification.permission === "granted"
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    authLogoutAndRedirect: AuthActions.authLogoutAndRedirect,
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(Settings)