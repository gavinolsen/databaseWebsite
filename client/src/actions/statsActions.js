import axios from 'axios';
import {
  GET_STATS,
  GET_STATS_225,
  GET_STATS_325,
  GET_ERRORS,
  GET_LOGGED_IN_USERS
} from './types';

//file where we make all the requests

export const fetchStats = () => dispatch => {
  //dispatch requests loading
  axios
    .get('/api/stats/totals')
    .then(res => {
      dispatch({
        type: GET_STATS,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch must have a type
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

//api/stats/225
export const getStats225 = () => dispatch => {
  axios
    .get('/api/stats/225')
    .then(res => {
      dispatch({
        type: GET_STATS_225,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch must have a type
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

//api/stats/325
export const getStats325 = () => dispatch => {
  axios
    .get('/api/stats/325')
    .then(res => {
      dispatch({
        type: GET_STATS_325,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch must have a type
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

export const getLoggedInUsers = () => dispatch => {
  axios
    .get('/api/stats/loggedin')
    .then(res => {
      console.log(res.data);

      //get the logged in users
      dispatch({
        type: GET_LOGGED_IN_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch must have a type
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};
