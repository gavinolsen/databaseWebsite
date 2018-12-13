import axios from 'axios';

//get types
import {
  GET_REQUESTS,
  MAKE_A_REQUEST,
  DELETE_REQUEST,
  REQUESTS_LOADING,
  GET_ERRORS
} from './types';

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

export const makeRequest = (requestData, history) => dispatch => {
  //I'll change this to go to the
  //request List. In the future, I'll just
  //have a modal button on the top of each list
  //I'd like to push

  /**
   * switch (requestData.className) {
    case '111':
     history.push('/helplist111');
    case '225':
     history.push('/helplist225');
    case '325':
     history.push('/helplist325');
    case '425':
     history.push('/helplist425'); 
    default:
      history.push('/dashboard');
   * 
   */

  //lets take a look at the data here
  console.log(requestData);

  //make it go to the list of requests!
  axios
    .post('/api/requests', requestData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      //dispatch must have a type
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

/**
 * 
 * import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
};

export const addItem = (item) => dispatch => {
  axios
    .post('/api/items', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
};

export const deleteItem = (id) => dispatch => {
  axios.delete(`/api/items/${id}`).then(res => 
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    );
};


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
 * 
 * 
 * 
 */
