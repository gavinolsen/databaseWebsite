const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//with this request, I'm not sure how
//i'll just associate the user with the
//user's id. I"ll add the classname in ther
//too, as well as the lab

//this object is only stored temporarily. As soon as
//the object is deleted from the list, it's gone from
//the database.

//permanent storage of each request is done by the
//StatsRequest object
const RequestSchema = new Schema({
  userInfo: {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'database student'
    }
  },
  className: {
    type: String,
    required: true
  },
  labNumber: {
    type: String,
    default: '1'
  },
  comment: {
    type: String,
    required: true
  },
  //no default. I need this value to be provided
  //and be the same for the stats_request date
  //as well
  date: {
    type: Date,
    required: true
  },
  isBeingHelped: {
    type: Boolean,
    default: false
  },
  //these are timestamps
  timeStartedHelp: {
    type: Number,
    required: false
  },
  timeFinishedHelp: {
    type: Number,
    required: false
  }
});

module.exports = Request = mongoose.model('request', RequestSchema);
