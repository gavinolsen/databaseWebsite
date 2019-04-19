const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
  term: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = Term = mongoose.model('term', TermSchema);


