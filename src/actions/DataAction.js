import{DATA} from '../constants/actionTypes';

function loadDataAction(payload) {
  return {
    type: DATA.LOADED,
    payload
  }

}

export function loadData(data){
  return (dispatch)=>{
    dispatch(loadDataAction(data))
  }
}