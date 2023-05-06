import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import rootReducer from './redux';

import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: "root",    
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logger, promise]

  export const  store = createStore(
    persistedReducer,
      applyMiddleware(...middleware)
    )
  export const persistor = persistStore(store)