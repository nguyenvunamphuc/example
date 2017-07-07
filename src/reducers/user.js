import {ACCOUNT} from '../constants/actionTypes';
import {

  Alert
} from 'react-native';
const initialState = {
  isLogin: false,
  user: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.LOGIN: {
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };

    }
    case ACCOUNT.FAIL : {
      Alert.alert(
        'WARRING',
        " email or password is't correct",
        [

          {text: 'OK'},
        ],
        {cancelable: true}
      );
      return {
        ...state
      }
    }
    case ACCOUNT.LOGOUT : {
      return {
        ...state,
        isLogin: false,
        user: {}
      }
    }
    default:
      return {...state};
  }
}