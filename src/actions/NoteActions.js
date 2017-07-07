import {NOTE} from "../constants/actionTypes";
import Config from '../config.json';
var uri = Config.uri;
function fetchNoteDataAction(payload) {
  return {
    type: NOTE.FETCH,
    payload
  }
}

export function postNote(title: string, content: string) {
  return new Promise((resolve, reject) => {
    fetch(`${uri}/api/notes/createNote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error)
      })
  });
}
export function editNote(title: string, content: string, id: string) {

  return new Promise((resolve, reject) => {
    fetch(`${uri}/api/notes/UpdateNote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        id: id,
      })
    }).then((response) => resolve(response))

      .catch((error) => {
        reject(error)
      })
  });
}
export function deleteNote(id: string) {

  return new Promise((resolve, reject) => {
    fetch(`${uri}/api/notes/DeleteNote?id=${id}`, {
      method: 'GET',

    }).then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error)
      })
  });
}