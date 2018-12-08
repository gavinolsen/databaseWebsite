const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//if i think of a better name for requests,
//i'll come back and change it later

//i think i'll leave it as number of requests
//in the request schema, i'll want to have an
//object that I use to identify the student who
//gave the request
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  number_of_requests: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
