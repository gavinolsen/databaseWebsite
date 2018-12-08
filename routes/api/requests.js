const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * @route   GET api/requests/test
 * @desc    Test requests route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'requests works' }));

/**
 * @route   GET api/requests/
 * @desc    get all of the requests
 * @access  Public
 */

/**
 * @route   GET api/requests/225
 * @desc    get the requests for the 225 class
 * @access  Public
 */

/**
 * @route   GET api/requests/325
 * @desc    get the requests for the 325 class
 * @access  Public
 */

/**
 * @route   POST api/requests/
 * @desc    make a request
 * @access  Private
 */

/**
 * @route   DELETE api/requests/:id
 * @desc    delete a request
 * @access  Private
 */

module.exports = router;
