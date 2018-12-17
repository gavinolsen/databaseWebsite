//sets up the state of our app!
import { GET_REQUESTS, MAKE_REQUEST, DELETE_REQUEST } from '../actions/types';

//I want to know if the user has already made a request
//so we can just check these requests!
const initalState = {
  requests: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      //console.log(action);
      return {
        ...state,
        requests: action.payload
      };
    case MAKE_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests]
      };
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          request => request._id !== action.payload
        )
      };
    default:
      return state;
  }
}
