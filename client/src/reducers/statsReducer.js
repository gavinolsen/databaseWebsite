import { GET_STATS, GET_STATS_225, GET_STATS_325 } from '../actions/types';
//

const initialState = {
  requests: 0,
  logins: 0,
  stats225: [],
  stats325: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        requests: action.payload.requests,
        logins: action.payload.logins
      };
    case GET_STATS_225:
      return {
        ...state,
        stats225: action.payload
      };
    case GET_STATS_325:
      return {
        ...state,
        stats325: action.payload
      };
    default:
      return state;
  }
}