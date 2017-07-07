import {combineReducers} from 'redux';
import user from './user';
import travel from './data';
import note from './note';

export default combineReducers({
  user,
  travel,
  note
})