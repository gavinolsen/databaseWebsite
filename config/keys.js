//this is where we will put our
//mongo key when we get the dang
//internet up and running

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
