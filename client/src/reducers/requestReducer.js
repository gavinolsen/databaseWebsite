//sets up the state of our app!
import {
  GET_REQUESTS,
  MAKE_REQUEST,
  REQUESTS_LOADING,
  DELETE_REQUEST
} from '../actions/types';

//I want to know if the user
//
const initalState = {
  isWaitingOnHelp: false,
  requests: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    case MAKE_REQUEST:
      return {
        ...state,
        isWaitingOnHelp: true,
        requests: [action.payload, ...state.requests]
      };
    default:
      return state;
  }
}

/**
 * 
 * export default function(state = initialState, action) {
  switch(action.type){
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
      case ADD_ITEM:
      return {
        ...state,
        items:[action.payload, ...state.items]
      }
      case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
 * 
 */