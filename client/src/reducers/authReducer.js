//sets up the state of our app!
import {
  SET_CURRENT_USER,
  CLEAR_USER,
  SET_ADMIN,
  ADD_ADMIN,
  REMOVE_ADMIN,
} from '../actions/types';
import isEmpty from '../validation/is-empty';

//I could actually just manually check in here for the auth state too!
//that would work if I just get the id's from mongodb

const initalState = {
  isAuthenticated: false,
  isAdmin: false,
  className: '',
  email: '',
  password: '',
  user: {},
  admins: [],
};

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: action.isAdmin ? action.isAdmin : state.isAdmin,
        className: action.className,
        user: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        className: '',
        user: action.payload,
      };

    case SET_ADMIN:
      return {
        ...state,
        admins: action.payload,
      };
    case ADD_ADMIN:

      return {
        ...state,
        admins: [action.payload, ...state.admins],
      };
    case REMOVE_ADMIN:

      const filteredAdmins = state.admins.filter(
        admin => admin.id !== action.payload
      )

      return {
        ...state,
        admins: filteredAdmins,
      };
    default:
      return state;
  }
}

/**
 * 
 * case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          request => request._id !== action.payload
        )
      };
 */
