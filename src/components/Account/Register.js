import React, {Component,} from 'react';
import {connect} from 'react-redux';
import {register} from '../../actions/AccountAction';
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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      rePass : '',
      signuped: false
    };

  }

  componentWillMount() {
    AsyncStorage.getItem('email', (err, result) => {
      if (result) {
        this.props.navigator.replace({name: "Main"})
      }
    });

  }

  componentWillReceiveProps(nextProps) {
    let account = nextProps.user;
    if (account.isLogin) {
      this.props.navigator.replace({name: "Main"})
    }

  }

  register() {
    if(this.state.email !== "" && this.state.pass === this.state.rePass)
    {
      this.props.register(this.state.email, this.state.pass)

    }else console.warn('fail')


  }

  loginChangeView(){
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.text}>Email:</Text>
            <Text style={styles.text}>Password:</Text>
            <Text style={styles.text}>Re-Password:</Text>
          </View>
          <View>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              value={this.state.email}
              onChangeText={(email) => {
                this.setState({email})
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
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              style={styles.textInput}
              value={this.state.rePass}
              onChangeText={(rePass) => {
                this.setState({rePass})
              }}
            />
          </View>
        </View>
        <TouchableHighlight onPress={this.register.bind(this)}>
          <Text style={styles.submit}>register</Text>
        </TouchableHighlight>
        <Text>or</Text>
        <TouchableHighlight onPress={this.loginChangeView.bind(this)}>
          <Text style={styles.submit}>Login</Text>
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
    width: 80,
    height: 30,
    fontSize: 15,
    textAlign: 'center',
    padding: 4,
    color: '#FFF'
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
    width: window.width /1.5,
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
  register
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);