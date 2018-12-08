const Validator = require('validator');

//this comes in so that we can check
const isEmpty = require('./is-empty');

//this function lets us see whether the input is valid or not
//validator has a lot of other functions that can check to
//see whether or not there are certain characters in tha name,
//or password
//the data that we send in will be req.body
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //we are assigning errors a key of name with the
  //associated valued
  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'please enter a valid email';
  }
  //in this json string,
  //you don't need to say errors twice
  //becuase
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
