/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native


import rootReducer from '../reducers';
import DevTools from '../containers/Root/DevTools';



export default function configureStore(initialState, history) {
  const logger = createLogger();

  // Build the middleware for intercepting and dispatching navigation actions
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

  const middlewareWithDevTools = compose(
    middleware,
    DevTools.instrument()
  );

  const rootReducerOffline = persistCombineReducers({
      key: 'root',
      storage,
    },
    rootReducer,
  )

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store = createStore(
    rootReducerOffline,
    initialState,
    middlewareWithDevTools
  );

  let persistor = persistStore(store)

  
  if (module.hot) {
    module.hot
      .accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

        store.replaceReducer(nextRootReducer);
      });
  }

  return { persistor, store }
}
