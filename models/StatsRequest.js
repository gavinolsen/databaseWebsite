const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this schema is almost the same as the schema in the Request.js file
//but this schema stays in the database permanently for statistics.
const StatsRequestSchema = new Schema({
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
  //I can't get this at the same time I make the
  //request, because it needs to go through mongodb
  //to get the _id field needed here. I'm going to
  //try finding the stats request by the date. Hopefully
  // that'll work
  // requestId: {
  //   type: String,
  //   required: false
  // },
  className: {
    type: String,
    required: true
  },
  //this is a string, don't forget that
  labNumber: {
    type: String,
    default: '1'
  },
  date: {
    type: Date,
    required: true
  },
  timeStartedHelp: {
    type: Number,
    required: false
  },
  timeFinishedHelp: {
    type: Number,
    required: false
  },
  isMobileRequest: {
    type: Boolean,
    default: false
  }, 
  term: {
    type: String,
    required: true
  }
});

module.exports = Request = mongoose.model('stats_request', StatsRequestSchema);
