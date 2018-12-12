//sets up the state of our app!
import { GET_REQUESTS, MAKE_A_REQUEST } from '../actions/types';
import isEmpty from '../validation/is-empty';

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
    case MAKE_A_REQUEST:
      return {
        ...state,
        isWaitingOnHelp: true,
        requests: action.payload
      };
    default:
      return state;
  }
}
