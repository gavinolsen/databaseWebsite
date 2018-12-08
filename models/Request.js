const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//with this request, I'm not sure how
//i'll just associate the user with the
//user's id. I"ll add the classname in ther
//too, as well as the lab
const RequestSchema = new Schema({
  user_info: {
    user_id: {
      type: String,
      required: true
    },
    user_class: {
      type: String,
      required: true
    }
  },
  lab_number: {
    type: String,
    default: '1'
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = Request = mongoose.model('request', RequestSchema);
