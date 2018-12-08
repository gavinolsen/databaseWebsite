const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//with this request, I'm not sure how
//i'll just associate the user with the
//user's id. I"ll add the classname in ther
//too, as well as the lab
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
  }
});

module.exports = Request = mongoose.model('request', RequestSchema);
