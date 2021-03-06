import { GET_ERRORS } from '../actions/types';

//sets up the state of our app!

const initalState = {
  errors: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
