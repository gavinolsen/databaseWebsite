import axios from 'axios';

//get types
import {
  GET_REQUESTS,
  DELETE_REQUEST,
  GET_ERRORS,
  START_HELPING
} from './types';

export const fetchRequests = history => dispatch => {
  //dispatch requests loading
  axios
    .get('/api/requests')
    .then(res => {
      dispatch({
        type: GET_REQUESTS,
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

export const makeRequest = (requestData, history) => dispatch => {
  //I'll change this to go to the
  //request List. In the future, I'll just
  //have a modal button on the top of each list
  //I'd like to push  //lets take a look at the data here
  //console.log(requestData);

  //make it go to the list of requests!
  axios
    .post('/api/requests', requestData)
    .then(res => {
      history.push('/requestlist');
    })
    .catch(err => {
      if (err.response) {
        //dispatch must have a type
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

//we need the id to know which one to delete!
export const deleteRequest = id => dispatch => {
  axios.delete(`/api/requests/${id}`).then(res => {
    dispatch({
      type: DELETE_REQUEST,
      payload: id
    });
  });
};

export const startHelpingRequest = (id, history) => dispatch => {
  axios
    .post(`/api/requests/help/${id}`)
    .then(res => {
      dispatch({
        type: START_HELPING,
        payload: res.data.request
      });

      history.push('/requestlist');
    })
    .catch(err => {
      if (err.response) {
        //dispatch must have a type
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};
