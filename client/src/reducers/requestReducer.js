//sets up the state of our app!
import {
  GET_REQUESTS,
  MAKE_REQUEST,
  DELETE_REQUEST,
  START_HELPING
} from '../actions/types';

//I want to know if the user has already made a request
//so we can just check these requests!
const initalState = {
  requests: [],
  //this is an array of the request id's. not the actual
  //request json object. It makes it a little more lightweight
  requestsAttendedTo: []
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
        requests: [action.payload, ...state.requests]
      };
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          request => request._id !== action.payload
        )
      };
    case START_HELPING:
      //take out the one we modified on the back end
      var newRequests = state.requests.filter(function(request, idx, arr) {
        return request._id !== action.payload._id;
      });

      //i want to sort them so the requests being helped always come up on
      //the top
      var requestsNotHelped = newRequests.filter(function(request, idx, arr) {
        return !request.isBeingHelped;
      });

      var requestsBeingHelped = newRequests.filter(function(request, idx, arr) {
        return request.isBeingHelped;
      });

      var modifiedRequests = requestsNotHelped;

      for (var i = 0; i < requestsBeingHelped.length; i++) {
        modifiedRequests.unshift(requestsBeingHelped[i]);
      }

      //and put the modified one in
      modifiedRequests.unshift(action.payload);

      return {
        ...state,
        requests: modifiedRequests
      };
    default:
      return state;
  }
}
