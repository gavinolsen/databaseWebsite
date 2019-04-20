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
 * @route   POST api/mobile/users/login
 * @desc    Let the users log in
 * @access  Public
 */
router.post('/users/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const upperEmail = req.body.email;
  const email = upperEmail.toLowerCase();
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

        //subtle differences between this and the
        //object returned in the request
        newUserObject = {
          numberOfRequests: user.numberOfRequests,
          timesLoggedIn: user.timesLoggedIn,
          isAdmin: user.isAdmin,
          _id: user._id,
          name: user.name,
          email: user.email,
          className: user.className
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '7 days' },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token,
              user: newUserObject
            });
          }
        );

        //keep track of usage statistics
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


//the app isn't picking this route up. Not sure why???

/**
 * @route   POST api/mobile/requests
 * @desc    make a request
 * @access  Private
 **/
router.post(
  '/requests',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //validate input
    const { errors, isValid } = validateRequestInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }

    //get the new date to be consistent
    var newDate = Date.now();

    //make a new request
    const newRequest = new Request({
      userInfo: {
        _id: req.body._id,
        name: req.body.name
      },
      className: req.body.className,
      labNumber: req.body.labNumber,
      comment: req.body.comment,
      date: newDate
    });

    //make a stats request
    const newStatsRequest = new StatsRequest({
      userInfo: {
        _id: req.body._id,
        name: req.body.name
      },
      className: req.body.className,
      labNumber: req.body.labNumber,
      date: newDate,
      isMobileRequest: true,
      term: req.body.term
    });

    //save the request for viewing purposes as well as
    //statistics
    newRequest.save().catch(err => res.status(404).json(err));
    newStatsRequest.save().catch(err => res.status(404).json(err));

    //now increment the users numberOfReqests.
    User.findById(req.body._id)
      .then(user => {
        user.numberOfRequests = user.numberOfRequests + 1; //increment the number of requests
        user.isWaitingOnHelp = true;
        user.save().catch(err => res.status); //save the request
        res.json({ newRequest }); //spit back the results of both
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   GET api/mobile/requests
 * @desc    get the requests for the class
 * @access  Public
 */
router.get('/requests', (req, res) => {
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
 * @route   delete api/mobile/requests/:id
 * @desc    delete a request, reguardless of class
 * @access  Private
 */
router.delete(
  '/requests/:id',
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

        //I'll only need to pass through the user's id through the body
        if (
          request.userInfo._id.toString() !== req.body._id.toString() &&
          !req.body.isAdmin
        ) {
          //the user isn't authorized for this
          errors.noauth = 'you are not authorized to delete that request';
          return res.status(403).json(errors);
        }

        let currentTime = Date.now();

        //get the stats request, and set the values
        //timeStartedHelp timeFinishedHelp
        //to the values in this request
        //divide these values by (1000 * 3600)
        // and you'll get the time in minutes!
        let timeBeingHelped = currentTime - request.timeStartedHelp;

        StatsRequest.findOne({ date: request.date }).then(stats_request => {
          stats_request.timeStartedHelp = request.timeStartedHelp;
          stats_request.timeFinishedHelp = currentTime;

          stats_request.save().catch(err => console.log(err));

          /*  this is where I'll have
           *  to modify the users
           *  'totalTimeBeingHelped' */
          User.findById(request.userInfo._id).then(user => {
            user.isWaitingOnHelp = false;
            //not sure about the units, but they type is Number for now!
            user.totalTimeBeingHelped =
              user.totalTimeBeingHelped + timeBeingHelped;
            user
              .save()
              .then()
              .catch(err => res.json(err));
          });
        });

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
 * @route   POST api/mobile/requests/help/:id
 * @desc    for the TA's to start helping a student
 * @access  Private
 */
router.post(
  '/requests/help/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Request.findById(req.params.id).then(request => {
      if (!request) {
        errors.norequest = 'no request by that id';
        return res.status(404).json(errors);
      }

      if (!req.body.isAdmin) {
        errors.noauth = 'you are not authorized to perform this action';
        return res.status(403).json(errors);
      }

      //they are authorized, and the request exists
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

module.exports = router;
