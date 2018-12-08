const Validator = require('validator');

//this comes in so that we can check
const isEmpty = require('./is-empty');

//this function lets us see whether the input is valid or not
//validator has a lot of other functions that can check to
//see whether or not there are certain characters in tha name,
//or password
//the data that we send in will be req.body
module.exports = function validateRequestInput(data) {
  let errors = {};

  //data.className = !isEmpty(data.className) ? data.className : '';
  data.comment = !isEmpty(data.comment) ? data.comment : '';
  data.labNumber = !isEmpty(data.labNumber) ? data.labNumber : '';

  //we are assigning errors a key of name with the
  //associated valued
  //if (Validator.isEmpty(data.className)) {
  //  errors.className = 'className field is required';
  // }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = 'comment field is required';
  }

  if (Validator.isEmpty(data.labNumber)) {
    errors.labNumber = 'labNumber field required';
  }
  //in this json string,
  //you don't need to say errors twice
  //becuase
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
