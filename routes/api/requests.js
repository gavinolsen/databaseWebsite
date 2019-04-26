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

/**
 * @route   GET api/requests/test
 * @desc    Test requests route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'requests works' }));

/**
 * @route   GET api/requests/
 * @desc    get the requests for the class
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

//these next two are really for statistics,
//but i've basically replicated it
//in the stats.js router file
/**
 * @route   GET api/requests/225
 * @desc    get the requests for the 225 class
 * @access  Public
 */
router.get('/225', (req, res) => {
  Request.find({ className: '225' })
    .then(requests => {
      const errors = {};
      if (!requests) {
        errors.norequests = 'there are no requests for 325';
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
 * @route   GET api/requests/325
 * @desc    get the requests for the 325 class
 * @access  Public
 */
router.get('/325', (req, res) => {
  Request.find({ className: '325' })
    .then(requests => {
      const errors = {};
      if (!requests) {
        errors.norequests = 'there are no requests for 325';
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
      console.log('request not valid')
      return res.status(404).json(errors);
    }

    //make a default date!
    //this date is used as an
    //identifier. aka foreign key
    //very important
    const newDate = Date.now();

    //make a new request
    const newRequest = new Request({
      userInfo: {
        _id: req.user.id,
        name: req.user.name
      },
      className: req.user.className,
      labNumber: req.body.labNumber,
      comment: req.body.comment,
      date: newDate
    });

    //make a stats request
    const newStatsRequest = new StatsRequest({
      userInfo: {
        _id: req.user.id,
        name: req.user.name
      },
      className: req.user.className,
      labNumber: req.body.labNumber,
      date: newDate,
      term: req.body.term
    });

    //save the request for viewing purposes as well as
    //statistics
    newRequest.save().catch(err =>{
        console.log('error saving the new request')
      });
    newStatsRequest.save().catch(err => {
      console.log('error saving new stats request')
    });

    //now increment the users numberOfReqests.
    User.findById(req.user.id)
      .then(user => {
        user.numberOfRequests = user.numberOfRequests + 1; //increment the number of requests
        user.isWaitingOnHelp = true;
        user
          .save()
          .then()
          .catch(err => res.status); //save the request
        res.json({ user, newRequest }); //spit back the results of both
      })
      .catch(err => {
        console.log('error finding user')
      });
  }
);

/**
 * @route   POST api/requests/help/:id
 * @desc    for the TA's to start helping a student
 * @access  Private
 */
router.post(
  '/help/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Request.findById(req.params.id).then(request => {
      if (!request) {
        errors.norequest = 'no request by that id';
        return res.status(404).json(errors);
      }

      //make sure you uncomment this!
      if (!req.user.isAdmin) {
        //the user isn't authorized for this
        errors.noauth = 'you are not authorized to perform this action';
        return res.status(403).json(errors);
      }

      //they are authorized, and the request exists.
      //now mark the request as being helped!
      request.isBeingHelped = true;
      request.timeStartedHelp = Date.now();

      request.save().catch(err => console.log(err));

      //and send back what you got!
      res.json({
        success: true,
        request: request
      });
    });
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

        //console.log(req.user);

        //this will work for now,
        //just checking if they can delete the request
        if (
          request.userInfo._id.toString() !== req.user._id.toString() &&
          !req.user.isAdmin
        ) {
          //the user isn't authorized for this
          errors.noauth = 'you are not authorized to delete that request';
          return res.status(403).json(errors);
        }

        let currentTime = Date.now();

        //get the stats request, and set the values
        //timeStartedHelp
        //and
        //timeFinishedHelp
        //to the values in this request
        //divide these values by (1000 * 3600)
        // and you'll get the time in minutes!
        let timeBeingHelped = currentTime - request.timeStartedHelp;

        StatsRequest.findOne({ date: request.date }).then(stats_request => {
          stats_request.timeStartedHelp = request.timeStartedHelp;
          stats_request.timeFinishedHelp = currentTime;

          stats_request.save().catch(err => console.log(err));

          /*********************
           *  this is where I'll have
           *  to modify the users
           *  'totalTimeBeingHelped' property
           *  by subtracting the time they started
           *  being helped from the time they stoped
           * ***************** */

          User.findById(request.userInfo._id).then(user => {
            //change the dates depending on the properties
            //stated above,
            //timeStartedHelp - timeFinishedHelp
            user.isWaitingOnHelp = false;
            //not sure about the units, but they type is Number for now!
            user.totalTimeBeingHelped =
              user.totalTimeBeingHelped + timeBeingHelped;
            user
              .save();
          });
        });

        //the request can now be deleted
        request
          .remove()
          .then(res.json({ success: true }))
          .catch(err => res.json(err));

        //request has been removed. now change the user's
        //isWaitingOnHelp property to false
      })
      .catch(err => {
        errors.norequest = "there's no request by that id";
        return res.status(404).json(errors, err);
      });
  }
);

module.exports = router;
