import React, { Component } from 'react'
import { Divider, Drawer as DrawerMaterial, IconButton, ListItem, List, Subheader } from 'src/utils/material-ui/index.js'
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import TodayIcon from 'material-ui/svg-icons/action/today';
import WeekIcon from 'material-ui/svg-icons/action/view-week';
import MonthIcon from 'material-ui/svg-icons/action/view-module';
import ChromeReaderIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import AddIcon from 'material-ui/svg-icons/content/add';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Avatar from 'src/components/Avatar'
import { getUsers } from 'src/reducers/users'
import './drawer.sass'


class Drawer extends Component {
  state = {
    open: false,
  }

  render = () => (
    <DrawerMaterial
      width={280}
      open={this.state.open}
      onRequestChange={open => this.setState({ open })}
      docked={false}>
      <div className="user-area">
        <div className="user-area__settings">
          <IconButton onClick={this.onClickSettings}>
            <SettingsIcon color="#fff" />
          </IconButton>
        </div>
        <Avatar size={62} image={this.props.user.avatar} name={this.props.user.name} />
        <p className="user-area__name">{this.props.user.name}</p>
        <p className="user-area__email">{this.props.user.email}</p>
      </div>
      <List className="menu">
        <ListItem primaryText="Today" leftIcon={<TodayIcon />} onClick={this.onClickToday} />
        <ListItem primaryText="Week" leftIcon={<WeekIcon />} onClick={this.onClickWeek} />
        <ListItem primaryText="Month" leftIcon={<MonthIcon />} onClick={this.onClickMonth} />
      </List>
      <Divider />
      <List className="menu">
        <Subheader>Lists</Subheader>
        {this.props.lists.map(list => (
          <ListItem
            primaryText={list.name}
            leftIcon={<ChromeReaderIcon color={list.color} />}
            onClick={this.onClickList.bind(this, list.id)}
            key={list.id} />
        ))}
        <ListItem
          primaryText="Add list"
          leftIcon={<AddIcon />}
          onClick={this.onClickAddList} />

        <Divider />
        <Subheader>Users</Subheader>
        { this.props.users.map(user => this.renderUserListItem(user))}
      </List>
    </DrawerMaterial>
  )

  renderUserListItem = (user) => (
    <ListItem
      primaryText={user.name}
      leftAvatar={
        <div style={styles.avatarWrapper}>
          <Avatar name={user.name} image={user.avatar} size={32} />
        </div>
      }
      onClick={this.onClickUser.bind(this, user)}
      key={user.id} />
  )

  toogle = () => {
    this.setState({ open: !this.state.open })
  }

  onClickAddList = () => this.routeTo('/add-list', false);

  onClickSettings = () => this.routeTo('/settings', false);

  onClickToday = () => this.routeTo('/');

  onClickUser = (user) => this.routeTo(`/user/${user.id}`);

  onClickWeek = () => this.routeTo('/week');

  onClickMonth = () => this.routeTo('/month');

  onClickList = (listId) => this.routeTo(`/list/${listId}`);

  routeTo = (route, replaceRoute = true) => {
    this.toogle();
    if (replaceRoute) {
      this.props.dispatch(replace(route));
    } else {
      setTimeout(() => this.props.dispatch(push(route)), 300)
    }
  }

}

const styles = {
  avatarWrapper: {
    display: 'flex',
    flex: 1,
    bottom: '8px',
    alignItems: 'center'
  }
}

const mapStateToProps = (state) => ({
  lists: Object.values(state.lists),
  user: state.user,
  users: getUsers(state),
})

export default connect(mapStateToProps, null, null, { withRef: true })(Drawer)
