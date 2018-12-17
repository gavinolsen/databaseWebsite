//sets up the state of our app!
import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

//I could actually just manually check in here for the auth state too!
//that would work if I just get the id's from mongodb

const initalState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
};

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: action.isAdmin ? action.isAdmin : state.isAdmin,
        user: action.payload
      };
    default:
      return state;
  }
}
