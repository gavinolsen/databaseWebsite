const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//models
const User = require('../../models/User');
const Request = require('../../models/Request');

//validation
const validateRequestInput = require('../../validation/request');

/**
 * @route   GET api/requests/test
 * @desc    Test requests route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'requests works' }));

/**
 * @route   GET api/requests/325
 * @desc    get the requests for the 325 class
 * @access  Public
 */
router.get('/', (req, res) => {
  Request.find({})
    .then(requests => {
      const errors = {};
      if (!requests) {
        errors.norequests = 'there are no requests';
        return res.status(404).json(errors);
      }
      //and return the requests
      res.json(requests);
    })
    .catch(err => {
      errors.catch = 'an error was caught';
      return res.status(404).json(errors, err);
    });
});

/**
 * @route   POST api/requests/
 * @desc    make a request
 * @access  Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //validate input
    const { errors, isValid } = validateRequestInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }

    //
    console.log(req.user);

    //make a new request
    const newRequest = new Request({
      userInfo: {
        _id: req.user.id,
        name: req.user.name,
        className: req.user.className
      },
      labNumber: req.body.labNumber,
      comment: req.body.comment
    });

    //now increment the users numberOfReqests.
    //modify it
    newRequest.save().catch(err => res.status(404).json(err));

    User.findById(req.user.id)
      .then(user => {
        user.numberOfRequests = user.numberOfRequests + 1; //increment the number of requests
        user
          .save()
          .then()
          .catch(err => res.status); //save the request
        res.json({ user, newRequest }); //spit back the results of both
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   delete api/requests/:id
 * @desc    delete a request, reguardless of class
 * @access  Private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    //find the id from the parameters
    Request.findById(req.params.id)
      .then(request => {
        if (!request) {
          errors.norequest = "there's no request by that id";
          return res.status(404).json(errors);
        }

        if (request.userInfo._id.toString() !== req.user._id.toString()) {
          //the user isn't authorized for this
          errors.noauth = 'you are not authorized to delete that request';
          return res.status(403).json(errors);
        } else if (req.user.isAdmin) {
          //i think that there could be a big exploit here
          //if they could change their request
          console.log({ msg: 'user is authorized' });
          request
            .remove()
            .then(() => {
              return res.json({ msg: 'user deleted by authorized user' });
            })
            .catch(err => res.json(err));
        }
        //the request can now be deleted
        request
          .remove()
          .then(res.json({ success: true }))
          .catch(err => res.json(err));
      })
      .catch(err => {
        errors.norequest = "there's no request by that id";
        return res.status(404).json(errors, err);
      });
  }
);

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
