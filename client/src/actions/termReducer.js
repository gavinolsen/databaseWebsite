import {CREATE_TERM, ACTIVATE_TERM, GET_TERMS, DELETE_TERM} from '../actions/types';

const initalState = {
  terms: []
}

export default function(state = initalState, action) {

  switch(action.type) {
    case CREATE_TERM:
      return {
        ...state,
        terms: [action.payload, ...state.terms]
      };
    case ACTIVATE_TERM:

    var newTerms = state.terms;
    var i;

    for(i = 0; i < newTerms.length; i++) {
      newTerms[i].active = false;
      if(newTerms[i]._id === action.payload) {
        newTerms[i].active = true;
      }
    }

    //console.log(newTerms);

    return {
      ...state,
      terms: newTerms
    };
    case GET_TERMS:
      return {
        ...state,
        terms: action.payload
      };
    case DELETE_TERM:
      return {
        ...state,
        terms: state.terms.filter(
          term => term._id !== action.payload
        )
      };
    default:
      return state;
  }

}


/*
 //the term to activate: action.payload
      //turn them all to false (terms[i].active = false).
      //then turn the new one true
      var newTerms = state.terms;
      var i;

      for(i = 0; i < newTerms.length; i++) {
        newTerms[i].active = false;
        if(newTerms[i]._id === action.payload) {
          newTerms[i].active = true;
        }
      }

      console.log(newTerms);

      return {
        ...state,
        terms: newTerms
      };




      return state.terms.map((term, _) => {
        if (term._id !== action.payload) {
          return {
            term: term.term,
            active: false
          };
        } else {
          return {
            term: term.term,
            active: true
          };
        }
      });



*/