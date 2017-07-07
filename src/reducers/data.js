import {DATA}from '../constants/actionTypes';

const initialState = {
 travel:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA.LOADED :
      return {
        travel: action.payload
      };
    default :
      return {state}

  }
}