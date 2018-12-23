import {
  GET_STATS,
  GET_STATS_225,
  GET_STATS_325,
  GET_LOGGED_IN_USERS
} from '../actions/types';
//

const initialState = {
  requests: 0,
  logins: 0,
  loggedInUsers: 0,
  stats225: [],
  stats325: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      //console.log('getting 325 stats');
      //console.log(action.payload);
      return {
        ...state,
        requests: action.payload.requests,
        logins: action.payload.logins
      };
    case GET_STATS_225:
      //console.log('getting 225 stats');
      //console.log(action.payload);
      return {
        ...state,
        stats225: action.payload
      };
    case GET_STATS_325:
      return {
        ...state,
        stats325: action.payload
      };
    case GET_LOGGED_IN_USERS:
      //console.log(action.payload);
      return {
        ...state,
        loggedInUsers: action.payload.count
      };
    default:
      return state;
  }
}
