const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//models
const User = require('../../models/User');
const Request = require('../../models/Request');
const StatsRequest = require('../../models/StatsRequest');

//validation
const validateRequestInput = require('../../validation/request');
const validateLoginInput = require('../../validation/login');

//get the keys
const keys = require('../../config/keys');

/**
 * @route   GET api/mobile/test
 * @desc    Test requests route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'mobile works' }));

/**
 * @route   POST api/mobile/login
 * @desc    Let the users log in
 * @access  Public
 */

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'no user associated with that email';
      return res.status(404).json(errors);
    }

    //a user exists, so check the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        //sign the token
        //3600 * 24 = 86400
        //the token expires in one day

        //The only difference here between the
        //mern stack and the app is that I won't have a
        //place to keep all of the data, so I'll need to
        //pass the user along with this, to keep in the app.
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '7 days' },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token,
              user: user
            });
          }
        );

        //the user is logged in, you can track the stats here!!!

        //here I want to track the number of times
        //that the student logs in :)
        //and this works. No results are
        //given to the server. But there aren't any
        //errors that I can see

        User.findOne({ email })
          .then(user => {
            user.timesLoggedIn = user.timesLoggedIn + 1; //increment the number of requests
            user.isLoggedIn = true;
            const today = {
              date: new Date().now
            };

            user.loginDates.push(today); //add the current date to the logins!!!
            user.save().catch(err => console.log(err)); //save the user
          })
          .catch(err => console.log(err));
      } else {
        errors.password = 'incorrect password';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
