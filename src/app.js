import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors'

import './styles/main.sass';
import './images/icons/pwa-192x192.png';
import './images/icons/pwa-144x144.png';
import MessageActions from './actions/message';
import TaskActions from './actions/task';
import ListActions from './actions/list';
import { getLastMessage } from './reducers/messages';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.blue500,
    primary2Color: colors.blue700,
    primary3Color: colors.blue400,
    pickerHeaderColor: colors.blue500,
  },
  appBar: {
    height: 56,
  }
});


class App extends React.Component {
  static childContextTypes = {
    drawer: PropTypes.object,
    setFab: PropTypes.func,
  };

  getChildContext() {
    return {
      drawer: this.drawer,
      setFab: this.setFab,
    }
  }

  state = {
    fab: null,
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }

  setFab = (fab) => {
    this.setState({ fab })
  }


  componentDidMount() {
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator == false) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
        return registration;
      })
        .then(registration => {
          // this.showNotification(registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  showNotification(registration) {

    var title = 'Yay a message.';
    var body = 'We have received a message.';
    // var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';
    var data = {
      doge: {
        wow: 'such amaze notification data'
      }
    };

    registration.showNotification(title, {
      body: body,
      // icon: icon,
      tag: tag,
      data: data
    })
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

export default connect(mapStateToProps, mapsDispatchToProps)(App);
export { App as AppNotConnected };
