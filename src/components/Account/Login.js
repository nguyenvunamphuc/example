import React, {Component,} from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/AccountAction';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

const window = Dimensions.get('window');
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      name: '',
      signuped: false
    };

  }

  componentWillMount() {
    AsyncStorage.getItem('userData', (err, result) => {
      //console.warn(result)
      if(result){
        let data = JSON.parse(result);
        if (data.isLogin) {
          this.props.navigator.replace({name: "Main"})

        }
      }

    });

  }

  componentWillReceiveProps(nextProps) {
    let account = nextProps.user;
    AsyncStorage.setItem('userData', JSON.stringify(nextProps.user));
    if (account.isLogin) {
      this.props.navigator.replace({name: "Main"})
    }

  }

  login() {
    this.props.logina(this.state.email, this.state.pass);

  }
  registerChangeView() {
    this.props.navigator.push({name:"Register"})
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.text}>Email:</Text>
            <Text style={styles.text}>Password:</Text>
          </View>
          <View>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              value={this.state.email}
              onChangeText={(email) => {
                this.setState({email: email.trim()})
              }}
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              style={styles.textInput}
              value={this.state.pass}
              onChangeText={(pass) => {
                this.setState({pass})
              }}
            />
          </View>
        </View>
        <TouchableHighlight onPress={this.login.bind(this)}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableHighlight>
        <Text>or</Text>
        <TouchableHighlight onPress={this.registerChangeView.bind(this)}>
          <Text style={styles.submit}>register</Text>
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
  submit: {
    borderRadius: 40,
    backgroundColor: '#5034FF',
    width: 90,
    height: 30,
    fontSize: 15,
    textAlign: 'center',
    padding: 4,
    color: '#FFF',
    marginTop: 5,
  },
  text: {
    height: 40,
    fontSize: 17,
    marginTop: 5,
    color: '#5034FF'
  },
  textInput: {
    height: 35,
    fontSize: 15,
    backgroundColor: '#FFF',
    marginTop: 4,
    marginLeft: 5,
    padding: 3,
    paddingLeft: 15,
    paddingRight: 15,
    width: window.width / 1.3,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#5034FF'
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = {
  logina: login
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);