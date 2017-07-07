import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import Index from './components/index';
import {Provider} from 'react-redux';
import store from './configStore';
export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
