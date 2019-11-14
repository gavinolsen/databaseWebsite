import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      //dispatch must have a type
      {
        if (err.response) {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        }
      }
    );
};

export const loginUser = userData => dispatch => {
  //console.log('authorizing user');

  //console.log(userData);
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to local storage
      //extract it from param

      //console.log('authorizing user');
      //console.log(res.data);

      const { token, isAdmin, className } = res.data;

      //console.log(className);
      localStorage.setItem('jwtToken', token);
      //call the function that we have set up
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user

      dispatch(setCurrentUser(decoded, isAdmin, className));
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

//set logged in user
export const setCurrentUser = (decoded, isAdmin, className) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    isAdmin,
    className
  };
};

export const logoutUser = userData => dispatch => {
  //remove the token from local storate
  console.log('removing local token');
  localStorage.removeItem('jwtToken');
  console.log('checking local token');
  console.log(localStorage.getItem('jwtToken'));
  //remove the auth header for future requests
  //we made this in ../utils/setAuthToken.js
  setAuthToken(false);
  //set current user to {}, which sets isAuthenticated to false
  //function made in this file, but calls the reducer
  //../reducers/authReducer.js

  dispatch(setCurrentUser({}));

  axios
    .post('/api/users/logout', userData)
    .then(res => {
      dispatch({
        type: CLEAR_USER,
        payload: {}
      });

      res.json(res);
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};
