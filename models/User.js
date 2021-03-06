const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//if i think of a better name for requests,
//i'll come back and change it later

//i think i'll leave it as number of requests
//in the request schema, i'll want to have an
//object that I use to identify the student who
//gave the request
//
//make a property here that tracks whether or not the user is logged in
//just toggle it in the users.js route file in the method where they log in.
//there will also  have to be a method
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isAssistant: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
