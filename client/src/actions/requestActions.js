import axios from 'axios';

//get types
import { GET_REQUESTS } from './types';

export const fetchRequests = history => dispatch => {
  axios
    .get('/api/requests')
    .then(res => history.push('/login'))
    .catch(err =>
      //dispatch must have a type
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
