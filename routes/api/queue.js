const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//models
const User = require('../../models/User');
const Request = require('../../models/Request');
const StatsRequest = require('../../models/StatsRequest');
const Queue = require('../../models/Queue');

//validation
const validateQueueInput = require('../../validation/request');

//get the keys
const keys = require('../../config/keys');

/**
 * @route   GET api/queue/test
 * @desc    Test requests route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'queue works' }));

/**
 * @route   POST api/queue/
 * @desc    Test requests route
 * @access  Public
 */

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {



  }
);

module.exports = router;
