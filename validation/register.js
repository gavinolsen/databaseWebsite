const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.className = !isEmpty(data.className) ? data.className : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //later in the app, this is where i'll check for the emails that
  //match the admin profiles....
  //just make sure to add it where it actually matters, where you save
  //the users in the routes

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'name must be between 2 & 30 characters';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'please enter a valid email';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password must be between 6 & 30 characters';
  }

  if (Validator.isEmpty(data.className)) {
    errors.className = 'must enter a class name';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'must enter a password';
  }

  if (
    !Validator.equals(data.password, data.password2) ||
    Validator.isEmpty(data.password2)
  ) {
    errors.password2 = 'passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
