import React from 'react';

import Screen from './screens/Screen'

import {store} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import {persistor} from './store'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Screen {...this.props} />
        </PersistGate>
      </Provider>
    )
  }
}
