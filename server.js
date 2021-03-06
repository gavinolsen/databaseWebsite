const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const passport = require('passport');
const path = require('path');
const connectDB = require('./config/db');

//set up the app
const app = express();
connectDB();

//and setup the middleware
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//and make sure you put the models here
const users = require('./routes/api/users');
const requests = require('./routes/api/requests');
const stats = require('./routes/api/stats');
const mobile = require('./routes/api/mobile');
const terms = require('./routes/api/terms');
const queue = require('./routes/api/queue');

//const mongoURI = require('./config/keys').mongoURI;
//connect with mongoose after internet is up..
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('mongo db connected successfully'))
//   .catch(err => console.log(err));


//make sure we put passport configuration in
//here as well as ./config/passport.js..

//middleware
app.use(passport.initialize());
//setup
require('./config/passport')(passport);

//and set up the port directories
//with the models we brought in
//aka the routes we brought in
app.use('/api/users', users);
app.use('/api/requests', requests);
app.use('/api/stats', stats);
app.use('/api/mobile', mobile);
app.use('/api/terms', terms);
app.use('/api/queue', queue);

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//and listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

/**
 *
 *
 * make a way to track current logged in users
 * TODO --> make variable in /models/User.js, then use it in the routes
 * group lists by class
 * TODO --> all you need to do for this is implement serverside rendering.
 *          create properties in the request reducer for 225 + 325 classes
 * make a way to sort logins + requests by lab / date
 * TODO --> learn about dates in javascript. implement the new class, StatsRequest
 *
 * limit size of comment to < 100 words and make sure you have step# + substep letter
 * restrict stats to admin users
 * add spinner to anything that loads!!
 *
 * another cool idea would be to list the users by descending number of requests
 * that would be in the stats
 */
