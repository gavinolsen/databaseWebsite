const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//import our model
const User = require('../../models/User');

//register the user
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//get the keys
const keys = require('../../config/keys');
const adminUsers = require('../../config/adminUsers').adminUsers.users;

/**
 * @route   GET api/users/test
 * @desc    Test users route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

/**
 *
 * I wanna make a logout route that gets called
 * when the user logs out! then I'll be able to
 * toggle the isLoggedIn property
 */

/**
 * @route   POST api/users/login
 * @desc    login the user and return the jwt
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
        //the token expires in fourd days
        //console.log(user);

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1 day' },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token,
              isAdmin: user.isAdmin,
              className: user.className
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

/**
 * @route   POST api/users/logout/
 * @desc    logout the user. this function is mainly for stats
 *          and current info
 * @access  Public
 */
router.post('/logout', (req, res) => {
  //console.log(req.body);

  User.findById({ _id: req.body.id })
    .then(user => {
      user.isLoggedIn = false;
      user.save().catch(err => res.json(err)); //save the user
    })
    .catch(err => res.json(err));
});

/**
 * @route   POST api/users/register
 * @desc    make a new user
 * @access  Public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'email already exists';
      return res.status(400).json(errors);
    }

    //probably set the isAdmin in the future
    //right here, and not in validation
    //because validation just checks for errors
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });

    //generate the users salt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        //save the user
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

/**
 * @route   Delete api/users/:id
 * @desc    delete the current users profile
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.params.id)
      .then(user => {
        //authenticate the user
        if (user._id.toString() !== req.user.id) {
          errors.notauthorized = 'user not authorized';
          return res.status(401).json(errors);
        }
        user.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ usernotfound: 'no user found with that id' })
      );
  }
);

/**
 * @route   GET api/users/all
 * @desc    get all the current users of the app
 * @access  Private
 */

 

/**
 * @route   GET api/users/current
 * @desc    get the current user's data
 * @access  Private
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      className: req.user.className,
      numberOfRequests: req.user.numberOfRequests
    });
  }
);

module.exports = router;
