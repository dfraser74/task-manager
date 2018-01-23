import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root/Root';
import configureStore from './store/configureStore';

let createHistory;

if (process.env.NODE_ENV === 'production') {
  createHistory = require('history/createMemoryHistory').default;
} else {
  createHistory = require('history/createBrowserHistory').default;
}

const initialState = {};
const target = document.getElementById('root');

const history = createHistory();
const { store, persistor } = configureStore(initialState, history);


const node = (
  <Root store={store} persistor={persistor} history={history} />
);


ReactDOM.render(node, target);
