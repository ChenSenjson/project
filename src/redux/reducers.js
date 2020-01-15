import { combineReducers } from 'redux'
import { SAVE_USER } from './action-type';
import { getItem } from '../utlis/storage'

const initUser = getItem('user') || {};
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
    default:
      return prevState;
  }
}

function bbb (prevState = 222, action){

  switch(action.type){
    default:
      return prevState;

  }

}

export default combineReducers({
  user,
  bbb
});