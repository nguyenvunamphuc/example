import {ACCOUNT} from '../constants/actionTypes';
import Config from '../config.json';
var uri = Config.uri;
function loginAction(payload) {
  return {
    type: ACCOUNT.LOGIN,
    payload
  }
}
function loginFailAction() {
  return {
    type: ACCOUNT.FAIL,
  }
}

function logoutAction() {
  return {
    type: ACCOUNT.LOGOUT
  }
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(logoutAction());
  }
}

export function login(email: string, pass: string) {

  return (dispatch) => {
    fetch(`${uri}/api/Accounts/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pass: pass,
      })
    }).then((response) => response.json())
      .then((responseJson) => {


        if(responseJson.error){
          dispatch(loginFailAction());
        }else
        {
          dispatch(loginAction(responseJson));
        }
      })
      .catch((error) => {
        //dispatch(loginFailAction());
      })
  }

}
export function register(email: string, pass: string) {
  return (dispatch) => {
    console.warn(email + pass);
    fetch(`${uri}/api/Accounts/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pass: pass,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){

        }else{
          console.warn(JSON.stringify(responseJson))
        }
      })
      .catch((error) => {
        console.warn(error)
      })
  }

}