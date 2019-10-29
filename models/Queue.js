const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  creator: {
    name: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  },
  admins: [{
    name: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  }],
  assistants: [{
    name: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  }],
  terms: [{
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  }]
});

module.exports = Queue = mongoose.model('queue', QueueSchema);