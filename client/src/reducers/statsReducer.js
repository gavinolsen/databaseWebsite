import { GET_STATS } from '../actions/types';

const initialState = {
  requests: 0,
  logins: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      console.log(action);
      return {
        ...state,
        requests: action.payload.requests,
        logins: action.payload.logins
      };
    default:
      return state;
  }
}
