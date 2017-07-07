import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView, Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  BackAndroid

} from 'react-native';
import {Header, Left} from 'native-base';
class ViewDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', function(){
      this.props.navigator.pop();
      return true
    }.bind(this));
  }
  back() {
    this.props.navigator.pop();
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <TouchableHighlight onPress={this.back.bind(this)} underlayColor="transparent">
              <Text style={styles.backBtn}>Back</Text>
            </TouchableHighlight>
          </Left>
        </Header>

        <ScrollView style={{margin: 10}}>
          <Text style={styles.text}>{this.props.data.travel.id}: {this.props.data.travel.tilte}</Text>
          <Image
            style={{width: window.width - 32, height: 300}}
            source={{uri: this.props.data.travel.img}}
          />
          <Text style={styles.text}>{this.props.data.travel.decription}</Text>
        </ScrollView>


      </View>
    )
  }
}
const styles = StyleSheet.create({

  text: {
    textAlign: "center"
  },
  list: {
    borderColor: "#FF3C3A",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10
  },
  backBtn: {
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
    data: state.travel
  }

};

export default connect(mapStateToProps)(ViewDetail) ;