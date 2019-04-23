import axios from 'axios';

import {
  GET_TERMS,
  ACTIVATE_TERM,
  CREATE_TERM,
  DELETE_TERM,
  GET_ERRORS,
} from './types';

export const fetchTerms = () => dispatch => {
  axios
    .get ('/api/terms')
    .then (res => {
      dispatch ({
        type: GET_TERMS,
        payload: res.data,
      });
    })
    .catch (err => {
      //dispatch must have a type
      if (err.response) {
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const makeTerm = (termData) => dispatch => {
  axios
    .post ('/api/terms', termData)
    .then (res => {
      dispatch ({
        type: CREATE_TERM,
        payload: termData,
      });
    })
    .catch (err => {
      if (err.response) {
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const activateTerm = (id, history) => dispatch => {
  axios.post(`/api/terms/activate/${id}`).then( res => {

    //console.log(res.data.term);

    dispatch({
      type: ACTIVATE_TERM,
      payload: res.data.term._id
    });
    history.push('/stats');
  }
  ).catch(err => {
      if (err.response) {
        //dispatch must have a type
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
} 

export const deleteTerm = (id) => dispatch => {
  axios.delete(`/api/terms/${id}`).then( res => {
    dispatch({
      type: DELETE_TERM,
      payload: id
    });
  }
  ).catch(err => {
      if (err.response) {
        //dispatch must have a type
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
}