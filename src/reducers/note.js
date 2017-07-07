import {NOTE} from '../constants/actionTypes';
const initialState = {
  note: {},
};
export default function(state = initialState, action){
  switch (action.type) {
    case NOTE.FETCH :
      return {
        note: action.payload
      };
    default :
      return {...state}

  }

}