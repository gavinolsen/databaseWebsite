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
    default: Date.now
  }
});

module.exports = Request = mongoose.model('stats_request', StatsRequestSchema);
