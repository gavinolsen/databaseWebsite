const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected...')
  } catch(err) {
    console.log('');
    console.log(err.message);
    //anything besides 0 is failure
    process.exit(1);
  }
};

module.exports = connectDB;