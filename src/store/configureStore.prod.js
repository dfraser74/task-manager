import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import rootReducer from '../reducers';


export default function configureStore(initialState, history) {
  // Add so dispatched route actions to the history
  const middleware = applyMiddleware(thunk, routerMiddleware(history));

  const rootReducerOffline = persistCombineReducers({
      key: 'root',
      storage,
    },
    rootReducer,
  )

  const store = createStore(rootReducerOffline, initialState, middleware);
  let persistor = persistStore(store)

  return { persistor, store }
}
