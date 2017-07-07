import React, {Component} from 'react';
import {connect} from 'react-redux';
import {

  Dimensions,
  AsyncStorage
} from 'react-native';
import AboutUser from '../Account/AboutUser';
import ListNews from './listView';
import Note from '../node/Note';
const ScrollableTabView = require('react-native-scrollable-tab-view');
const window = Dimensions.get('window');
class Main extends Component {

  render() {
    return (
      <ScrollableTabView  locked={true}  ref={(tabView) => { this.tabView = tabView; }}>
        <Note navigator={this.props.navigator} tabLabel="Note"/>
        <AboutUser navigator={this.props.navigator} tabLabel="About User"/>

        <ListNews navigator={this.props.navigator} tabLabel="List" />


      </ScrollableTabView>
    )
  }
}
// const styles = StyleSheet.create({
//   header: {
//     flex: 1,
//     marginTop: 5,
//     flexDirection: 'row',
//     justifyContent: 'flex-start'
//   },
//   item: {
//     marginTop: 5,
//     width: window.width / 4.2,
//     textAlign: 'center',
//     marginLeft: 1,
//     marginRight: 1,
//     height: 50,
//     borderRadius: 20,
//     borderColor: '#FF77E3',
//     borderWidth: 1,
//     justifyContent: 'center'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   textInput: {
//     height: 40,
//     fontSize: 15,
//     backgroundColor: '#FFF',
//     width: 300,
//   },
// });

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Main);