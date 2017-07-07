import React, {Component} from 'react';
import {connect} from 'react-redux';
import Config from '../../config.json';
import {loadData} from '../../actions/DataAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View, Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ListView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  BackAndroid
} from 'react-native';

const window = Dimensions.get('window');
class ListNews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loading: true,
      limit: 5,
      loadMoreIndicator: false,
      commentModal: false
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', function () {
      this.props.tabView.goToPage(1);
      return true
    }.bind(this));
  }

  componentDidMount() {
    this.fetchData();

  }

  fetchData() {
    setTimeout(function () {
      this.setState({
        loading: true
      });
      var uri = Config.uri;
      return fetch(`${uri}/api/travels?filter[limit]=` + this.state.limit)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseJson),
            loading: false,
            //loadMoreIndicator: false
          });
        })
        .catch((error) => {
          Alert.alert(
            'WARRING',
            "Check your connection !!",
            [

              {text: 'OK'},
            ],
            {cancelable: true}
          );
        });

    }.bind(this), 0)

  }

  _refreshControl() {

    return (
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={() => {
          this.fetchData()
        }}/>
    )
  }

  ViewDetail(data) {

    this.props.loadData(data);
    this.props.navigator.push({name: "ViewDetail"});
  }

  loadMore() {

    this.setState({
      limit: this.state.limit + 5,
      loadMoreIndicator: true
    });
    // console.warn(this.state.loadMoreIndicator);
    this.fetchData();
  }

  setCommentModalVisible(visible) {
    this.setState({commentModal: visible});
  }

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
    });

    return (
      <View>
        {
          this.state.loading && <ActivityIndicator size="large"/>
        }

        <ListView
          refreshControl={this._refreshControl()}
          onEndReachedThreshold={1}
          dataSource={this.state.dataSource}
          onEndReached={() => {
            this.loadMore();
          }}
          renderRow={(rowdata) =>

            <View style={styles.list}>
              <TouchableOpacity onPress={() => {
                this.ViewDetail(rowdata)
              }}>
                <View>
                  <Image
                    style={{width: window.width, height: 300}}
                    source={{uri: rowdata.img}}
                  />
                  <Text style={{fontWeight: '800', margin: 15}}>{rowdata.tilte}  </Text>
                  <Text numberOfLines={3} style={{margin: 15}}>{rowdata.decription}</Text>
                </View>

              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 15}}>
                <TouchableOpacity onPress={() => this.setState({commentModal: true})}>
                  <Icon style={{margin: 5}} name="commenting-o" color='black' size={25}/>
                </TouchableOpacity>
                <Icon style={{margin: 5}} name="share-square-o" color='black' size={25}/>
                <Icon style={{margin: 5}} name="bookmark-o" color='black' size={25}/>
              </View>

              <Modal
                animationType={"none"}
                transparent={false}
                visible={this.state.commentModal}
                onRequestClose={() => {
                  alert("Modal has been closed.")
                }}
              >
                <View style={{flex:1}} >
                  <View style={{flex:1,height: 40,borderBottomColor: "#000000", borderBottomWidth:1,justifyContent:'center'}}>
                    <Text style={{alignSelf: "center", fontWeight: '500'}}>Comments</Text>
                    <TouchableOpacity  style={{position:'absolute', left:5}} onPress={() => {
                      this.setCommentModalVisible(!this.state.commentModal)
                    }}>
                      <Text>Back</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{flex: 10}}>
                  </View>
                  <View style={{flex: 1,borderTopWidth:1, borderColor:"#000000", flexDirection:'row', justifyContent:'center'}}>
                   <TextInput style={{flex:10}} underlineColorAndroid="transparent"/>
                    <Icon name="send-o" size={30} style={{flex:1, alignSelf:'center'}}/>
                  </View>
                </View>
              </Modal>
            </View>
          }/>


        {
          this.state.loadMoreIndicator && <ActivityIndicator size="large"/>
        }

      </View>
    )
  }
}
const styles = StyleSheet.create({
  list: {
    borderColor: "#FBFFE7",
    backgroundColor: "#FDFFFF",
    borderWidth: 1,
    marginBottom: 10
  }

});


const mapStateToProps = (state) => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = {
  loadData
};
export default connect(mapStateToProps, mapDispatchToProps)(ListNews);