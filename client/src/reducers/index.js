import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

//where we combine everything.
//this file is referenced as './reducers'
//from store.js in the client directory

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
