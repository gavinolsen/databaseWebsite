const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
 * @route   POST api/users/register
 * @desc    make a new user
 * @access  Private
 */

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
