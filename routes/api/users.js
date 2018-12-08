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

/**
 * @route   GET api/users/test
 * @desc    Test users route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

/**
 * @route   GET api/users/
 * @desc    get all the current users of the app
 * @access  Private
 */
router.get('/');

/**
 * @route   GET api/users/225
 * @desc    get all the current users of the app
 *          in the class 225
 * @access  Private
 */

/**
 * @route   GET api/users/325
 * @desc    get all the current users of the app
 *          in the class 325
 * @access  Private
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
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'incorrect password';
        return res.status(400).json(errors);
      }
    });
  });
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
      email: req.body.email,
      className: req.body.className
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
 * @route   GET api/users/
 * @desc    get all the current users of the app
 * @access  Private
 */
/**
 * @route   GET api/users/
 * @desc    get all the current users of the app
 * @access  Private
 */

module.exports = router;
