import React, {Component,} from 'react';
import {connect} from 'react-redux';
import {editNote, postNote, deleteNote} from '../../actions/NoteActions';
import Config from '../../config.json';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListView,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const window = Dimensions.get('window');
class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      modalVisible: false,
      title: '',
      content: '',
      id: '',
      loading: true
    };

  }

  componentDidMount() {
    this.fetchNoteData();
  }

  fetchNoteData() {
    var uri = Config.uri;
    return fetch(`${uri}/api/notes?filter[order]=id%20DESC&`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson),
          loading: false
        })
      })
      .catch((error) => {
        console.warn(error)
      });

  }

  async saveNote() {

    let response = await postNote(this.state.title, this.state.content);
    this.fetchNoteData();
    this.setState({modalVisible: !this.state.modalVisible});

  }

  async updateNote() {


    let response = await editNote(this.state.title, this.state.content, this.state.id);
    this.fetchNoteData();
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  async deleteNote(id) {
    let response = await deleteNote(id);
    this.fetchNoteData();
  }

  detroyNote(id) {
    Alert.alert(
      'WARRING',
      'Do you want to delete this',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'OK', onPress: () => this.deleteNote(id)
        },
      ],
      {cancelable: false}
    )
  }

  ViewDetail(data) {
    this.setState({
      title: data.title,
      content: data.content,
      id: data.id,
      modalVisible: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading && <ActivityIndicator size="large"/>
        }

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}

        >
          <TouchableOpacity style={styles.ousideModal} onPress={() => {
            this.setState({modalVisible: false})
          }}>
            <View>
            </View>
          </TouchableOpacity>
          <View style={styles.modal}>
            <TextInput
              value={this.state.title}
              onChangeText={(title) => {
                this.setState({title: title})
              }}
              style={{fontSize: 30, marginTop: 30}}
              placeholder={"Title"}
              selectTextOnFocus={true}/>
            <TextInput
              value={this.state.content}
              onChangeText={(content) => {
                this.setState({content: content})
              }}
              placeholder={"Note"}
              multiline={true}
              selectTextOnFocus={true}
              numberOfLines={10}
              textAlignVertical={'top'}/>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
              {
                this.state.id === "" ?
                  <TouchableOpacity style={styles.button} onPress={this.saveNote.bind(this)}>
                    <Text style={{textAlign: 'center'}}>Create</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity style={styles.button} onPress={this.updateNote.bind(this)}>
                    <Text style={{textAlign: 'center'}}>Save</Text>
                  </TouchableOpacity>
              }
              <TouchableOpacity style={styles.button} onPress={() => {
                this.setState({modalVisible: !this.state.modalVisible})
              }}>
                <Text style={{textAlign: 'center'}}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowdata) =>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {
                this.ViewDetail(rowdata)
              }}>
                <View style={styles.list}>

                  <Text style={styles.title}>{rowdata.title}</Text>
                  <Text>{rowdata.content}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 15,
                  backgroundColor: "#FF151D",
                  padding: 5,
                  borderRadius: 5
                }}
                onPress={() => this.detroyNote(rowdata.id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          }/>

        <TouchableOpacity style={styles.postBtn} onPress={() => {
          this.setState({modalVisible: !this.state.modalVisible, id: '', title: '', content: ''});
        }}>
          <Icon name="edit" size={30}/>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postBtn: {
    backgroundColor: '#4362FF',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    top: undefined,
    left: undefined,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  list: {
    borderColor: "#FBFFE7",
    backgroundColor: "#FDFFFF",
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginBottom: 10,
    width: window.width,
  },
  text: {
    height: 40,
    fontSize: 17,
    marginTop: 5,
    color: '#5034FF'
  },
  title: {
    fontSize: 30,
  },
  modal: {

    width: window.width / 1.2,
    height: window.height / 1.7,
    marginTop: (window.height - ( window.height / 1.7)) / 2,
    alignSelf: 'center',
    position: 'absolute',

    backgroundColor: '#FBF4FF',
    borderRadius: 10,
    flex: 1
  },
  ousideModal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    height: window.height,
    opacity: 0.1
  },
  button: {
    backgroundColor: '#484FFF',
    borderRadius: 5,
    height: 30,
    width: 50,
    margin: 10,
    justifyContent: 'center',

  }
});

const mapStateToProps = (state) => {
  return {
    note: state.note
  };
};

export default connect(mapStateToProps)(Note);