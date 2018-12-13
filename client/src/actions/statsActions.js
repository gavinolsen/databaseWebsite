import axios from 'axios';
import { GET_STATS, GET_ERRORS } from './types';

export const fetchStats = history => dispatch => {
  //dispatch requests loading
  axios
    .get('/api/users/stats')
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_STATS,
        payload: res.data
      });
    })
    .catch(err => {
      //dispatch must have a type
      console.log(err);
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};
