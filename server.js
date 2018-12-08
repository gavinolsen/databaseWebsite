const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const passport = require('passport');

//set up the app
const app = express();
//and setup the middleware
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

//and make sure you put the models here
const users = require('./routes/api/users');
const requests = require('./routes/api/requests');

const mongoURI = require('./config/keys').mongoURI;

//connect with mongoose after internet is up..

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('mongo db connected successfully'))
  .catch(err => console.log(err));

//make sure we put passport configuration in
//here as well as ./config/passport.js..

//and set up the port directories
//with the models we brought in
app.use('/api/users', users);
app.use('/api/requests', requests);

//and listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
