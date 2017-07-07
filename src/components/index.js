import React, {Component} from 'react';
import {connect} from'react-redux';
import Login from './Account/Login';
import ViewDetail from './Main/ViewDetail';
import Main from './Main/main';
import Register from './Account/Register';
import {
  StyleSheet,
  Navigator

} from 'react-native';
class Index extends Component {


  render() {
    return (
      <Navigator renderScene={this._renderScene.bind(this)} initialRoute={{name: 'Login'}}/>
    )
  }

  _renderScene(route, navigator) {
    switch (route.name) {
      case 'Login':
        return (
          <Login navigator={navigator}/>

        );
      case 'ViewDetail':
        return (
          <ViewDetail navigator={navigator}/>
        );
      case 'Main':
        return (
          <Main navigator={navigator}/>
        );
      case 'Register':
        return (
          <Register navigator={navigator}/>
        );


    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStatetoProp = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStatetoProp)(Index);