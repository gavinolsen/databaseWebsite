import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      //dispatch must have a type
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to local storage
      //extract it from param
      const { token } = res.data;
      //set it
      localStorage.setItem('jwtToken', token);
      //call the function that we have set up
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //remove the token from local storate
  localStorage.removeItem('jwtToken');
  //remove the auth header for future requests
  //we made this in ../utils/setAuthToken.js
  setAuthToken(false);
  //set current user to {}, which sets isAuthenticated to false
  //function made in this file, but calls the reducer
  //../reducers/authReducer.js
  dispatch(setCurrentUser({}));
};
