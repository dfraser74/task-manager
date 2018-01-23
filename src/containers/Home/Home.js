import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { AppBar } from 'src/utils/material-ui/index.js'
import Drawer from 'src/containers/Home/components/Drawer/Drawer';
import { Snackbar } from 'src/utils/material-ui/index.js'
import { getLastMessage } from 'src/reducers/messages';
import MessageActions from 'src/actions/message';
import TaskActions from 'src/actions/task';
import ListActions from 'src/actions/list';


class HomeView extends React.Component {
  static propTypes = {
    iconElementRight: PropTypes.element,
  };

  state = {
    fab: null,
    iconElementRight: null,
    backgroundColor: null,
  }

  render = () => {
    const conditional = {};
    if (this.state.iconElementRight) {
      conditional.iconElementRight = this.state.iconElementRight
    }
    if (this.state.backgroundColor) {
      conditional.style = {
        backgroundColor: this.state.backgroundColor
      }
    }

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <AppBar
          title={this.state.appBarTitle}
          onLeftIconButtonClick={this.toogleDrawer}
          { ...conditional }
        />

        { this.renderChildren() }

        <div style={styles.coordinator}>
          {this.state.fab && (
            <div style={styles.fabWrapp}>{this.state.fab}</div>
          )}
          <Drawer ref={c => this.drawer = c} />
          <Snackbar
            style={{
              position: 'relative',
              height: this.props.showingMessage ? 48 : 0,
              transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, visibility 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            }}
            open={this.props.showingMessage}
            message={this.props.message.title}
            action={this.getActionTitle()}
            autoHideDuration={5000}
            onActionClick={this.onActionClick}
            onRequestClose={this.handleRequestClose} />
        </div>
      </div>
    )
  }

  toogleDrawer = () => {
    this.drawer.getWrappedInstance().toogle();
  }

  getActionTitle = () => this.props.message.action ? this.props.message.action.title : "";

  handleRequestClose = () => this.props.actions.hiddeMessage();

  onActionClick = () => {
    if (!this.props.message.action) return;

    this.props.actions.dispatchAction(
      this.props.message.action.type,
      this.props.message.action.payload,
    )
    this.props.actions.hiddeMessage();
  }

  renderChildren = () => React.Children.map(this.props.children, (child) => {
    return React.cloneElement(child, { 
      setAppbarTitle: this.setAppbarTitle, 
      setFab: this.setFab, 
      setIconElementRight: this.setIconElementRight,
      setBackgroundColor: this.setBackgroundColor,
    });
  });

  setAppbarTitle = (appBarTitle) => this.setState({ appBarTitle });

  setFab = (fab) => this.setState({ fab });

  setIconElementRight = (iconElementRight) => this.setState({ iconElementRight });
  
  setBackgroundColor = (backgroundColor) => {
    if (backgroundColor === this.state.backgroundColor) return;
    this.setState({ backgroundColor })
    document.querySelectorAll('[name="theme-color"]')[0].content = 
      backgroundColor || "#2196F3";
  }

}

const styles = {
  coordinator: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 10000,
  },
  fabWrapp: {
    margin: 16,
    textAlign: 'right',
  }
}

const mapStateToProps = (state) => ({
  message: getLastMessage(state),
  showingMessage: state.messages.showing,
});

const mapsDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hiddeMessage: MessageActions.hiddeMessage,
    dispatchAction: MessageActions.dispatchAction,
    setAllTasks: TaskActions.setAll,
    setAllLists: ListActions.setAll,
  }, dispatch),
})


export default connect(mapStateToProps, mapsDispatchToProps)(HomeView);
