import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/AccountAction';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage

} from 'react-native';

class AboutUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : ""
    }
  }
componentDidMount(){
    AsyncStorage.getItem('email', (err,result)=>{
      if(result)
      this.setState ({
        email : result
      });
      else  this.setState ({
        email : this.props.user.user.email
      });
    });
}
  logout() {
    this.props.logout();
    AsyncStorage.clear();
    this.props.navigator.push({name: "Login"})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> email: {this.props.note.note.title}</Text>
        <TouchableHighlight onPress={this.logout.bind(this)}>
          <Text style={styles.button}>Log out</Text>
        </TouchableHighlight>
      </View>
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
  button: {
    borderRadius: 40,
    backgroundColor: '#5034FF',
    width: 100,
    height: 30,
    fontSize: 15,
    textAlign: 'center',
    padding: 4,
    color: '#FFF'
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    note: state.note
  };
};
const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUser);