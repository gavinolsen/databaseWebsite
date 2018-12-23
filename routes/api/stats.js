const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const getDay = require('date-fns/get_day');

//import our model
const User = require('../../models/User');
const StatsRequest = require('../../models/StatsRequest');

//this file will probably be all get requests.
//people just want a way to query the stats of the labs
//so they'll just be viewing the data coming in!
//pretty cool

/**
 * @route   GET api/stats/test
 * @desc    test route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'requests works' }));

//stats I want to see here    -->
//                            --> requests organized by the lab
//                            --> requests suborganized by the day
//                            --> logins organized by the week
//                            --> logins suborganized by the day

/**
 * @route   GET api/stats/225
 * @desc    sorts requests by the lab,
 *          pulled out of the 225 class
 *
 *          look at
 *          client/src/reducers/statsReducer
 *          &
 *          the totals route in this file
 *
 * @access  Public
 */
router.get('/225', (req, res) => {
  const stats = {
    lab1: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab2: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab3: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab4: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab5: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab6: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab7: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab8: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab9: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab10: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab11: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab12: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab13: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab14: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    }
  };

  StatsRequest.find({ className: '225' }).then(requests => {
    requests.map(request => {
      //console.log(request);
      //check for the string!!
      //that's what it's saved as

      //request.date.getDay returns a number 1-7!
      //console.log(request.date.getDay());

      //go through and get each of the number of days
      //that each o
      switch (request.labNumber.toString()) {
        case '1':
          stats.lab1.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab1.tue = stats.lab1.tue + 1;
              break;
            case 4:
              stats.lab1.thu = stats.lab1.thu + 1;
              break;
            case 6:
              stats.lab1.sat = stats.lab1.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '2':
          stats.lab2.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab2.tue = stats.lab2.tue + 1;
              break;
            case 4:
              stats.lab2.thu = stats.lab2.thu + 1;
              break;
            case 6:
              stats.lab2.sat = stats.lab2.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '3':
          stats.lab3.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab3.tue = stats.lab3.tue + 1;
              break;
            case 4:
              stats.lab3.thu = stats.lab3.thu + 1;
              break;
            case 6:
              stats.lab3.sat = stats.lab3.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '4':
          stats.lab4.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab4.tue = stats.lab4.tue + 1;
              break;
            case 4:
              stats.lab4.thu = stats.lab4.thu + 1;
              break;
            case 6:
              stats.lab4.sat = stats.lab4.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '5':
          stats.lab5.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab5.tue = stats.lab5.tue + 1;
              break;
            case 4:
              stats.lab5.thu = stats.lab5.thu + 1;
              break;
            case 6:
              stats.lab5.sat = stats.lab5.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '6':
          stats.lab6.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab6.tue = stats.lab6.tue + 1;
              break;
            case 4:
              stats.lab6.thu = stats.lab6.thu + 1;
              break;
            case 6:
              stats.lab6.sat = stats.lab6.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '7':
          stats.lab7.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab7.tue = stats.lab7.tue + 1;
              break;
            case 4:
              stats.lab7.thu = stats.lab7.thu + 1;
              break;
            case 6:
              stats.lab7.sat = stats.lab7.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '8':
          stats.lab8.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab8.tue = stats.lab8.tue + 1;
              break;
            case 4:
              stats.lab8.thu = stats.lab8.thu + 1;
              break;
            case 6:
              stats.lab8.sat = stats.lab8.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '9':
          stats.lab9.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab9.tue = stats.lab9.tue + 1;
              break;
            case 4:
              stats.lab9.thu = stats.lab9.thu + 1;
              break;
            case 6:
              stats.lab9.sat = stats.lab9.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '10':
          stats.lab10.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab10.tue = stats.lab10.tue + 1;
              break;
            case 4:
              stats.lab10.thu = stats.lab10.thu + 1;
              break;
            case 6:
              stats.lab10.sat = stats.lab10.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '11':
          stats.lab11.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab11.tue = stats.lab11.tue + 1;
              break;
            case 4:
              stats.lab11.thu = stats.lab11.thu + 1;
              break;
            case 6:
              stats.lab11.sat = stats.lab11.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '12':
          stats.lab12.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab12.tue = stats.lab12.tue + 1;
              break;
            case 4:
              stats.lab12.thu = stats.lab12.thu + 1;
              break;
            case 6:
              stats.lab12.sat = stats.lab12.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '13':
          stats.lab13.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab13.tue = stats.lab13.tue + 1;
              break;
            case 4:
              stats.lab13.thu = stats.lab13.thu + 1;
              break;
            case 6:
              stats.lab13.sat = stats.lab13.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '14':
          switch (getDay(request.date)) {
            case 2:
              stats.lab14.tue = stats.lab14.tue + 1;
              break;
            case 4:
              stats.lab14.thu = stats.lab14.thu + 1;
              break;
            case 6:
              stats.lab14.sat = stats.lab14.sat + 1;
              break;
            default:
              break;
          }

          stats.lab14.requests.push(request);
          break;
      }
    });

    //now I have it all like stats: {lab: { info }}
    //so lets just push it into an array!

    const statsArray = [];

    statsArray.push(stats.lab1);
    statsArray.push(stats.lab2);
    statsArray.push(stats.lab3);
    statsArray.push(stats.lab4);
    statsArray.push(stats.lab5);
    statsArray.push(stats.lab6);
    statsArray.push(stats.lab7);
    statsArray.push(stats.lab8);
    statsArray.push(stats.lab9);
    statsArray.push(stats.lab10);
    statsArray.push(stats.lab11);
    statsArray.push(stats.lab12);
    statsArray.push(stats.lab13);
    statsArray.push(stats.lab14);

    res.json(statsArray);
  });
});

/**
 * @route   GET api/stats/325
 * @desc    sorts requests by the lab,
 *          pulled out of the StatsRequest
 *          object that have a className
 *          value of 325
 *
 *          look at
 *          client/src/reducers/statsReducer
 *          &
 *          the totals route in this file
 *
 *          in order to understand how to
 *          work with the result on
 *          the front end
 *
 * @access  Public
 */
router.get('/325', (req, res) => {
  const stats = {
    lab1: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab2: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab3: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab4: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab5: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab6: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab7: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab8: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab9: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab10: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab11: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab12: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab13: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    },
    lab14: {
      requests: [],
      tue: 0,
      thu: 0,
      sat: 0
    }
  };

  StatsRequest.find({ className: '325' }).then(requests => {
    requests.map(request => {
      //console.log(request);
      //check for the string!!
      //that's what it's saved as

      //getDay request.datereturns a number 1-7!
      //console.log(getDay(request.date));

      //go through and get each of the number of days
      //that each o
      switch (request.labNumber.toString()) {
        case '1':
          stats.lab1.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab1.tue = stats.lab1.tue + 1;
              break;
            case 4:
              stats.lab1.thu = stats.lab1.thu + 1;
              break;
            case 6:
              stats.lab1.sat = stats.lab1.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '2':
          stats.lab2.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab2.tue = stats.lab2.tue + 1;
              break;
            case 4:
              stats.lab2.thu = stats.lab2.thu + 1;
              break;
            case 6:
              stats.lab2.sat = stats.lab2.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '3':
          stats.lab3.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab3.tue = stats.lab3.tue + 1;
              break;
            case 4:
              stats.lab3.thu = stats.lab3.thu + 1;
              break;
            case 6:
              stats.lab3.sat = stats.lab3.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '4':
          stats.lab4.requests.push(request);

          console.log('getDay function in action!');
          console.log(getDay(request.date));
          console.log('the date');
          console.log(request.date);

          switch (getDay(request.date)) {
            case 2:
              stats.lab4.tue = stats.lab4.tue + 1;
              break;
            case 4:
              stats.lab4.thu = stats.lab4.thu + 1;
              break;
            case 6:
              stats.lab4.sat = stats.lab4.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '5':
          stats.lab5.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab5.tue = stats.lab5.tue + 1;
              break;
            case 4:
              stats.lab5.thu = stats.lab5.thu + 1;
              break;
            case 6:
              stats.lab5.sat = stats.lab5.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '6':
          stats.lab6.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab6.tue = stats.lab6.tue + 1;
              break;
            case 4:
              stats.lab6.thu = stats.lab6.thu + 1;
              break;
            case 6:
              stats.lab6.sat = stats.lab6.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '7':
          stats.lab7.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab7.tue = stats.lab7.tue + 1;
              break;
            case 4:
              stats.lab7.thu = stats.lab7.thu + 1;
              break;
            case 6:
              stats.lab7.sat = stats.lab7.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '8':
          stats.lab8.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab8.tue = stats.lab8.tue + 1;
              break;
            case 4:
              stats.lab8.thu = stats.lab8.thu + 1;
              break;
            case 6:
              stats.lab8.sat = stats.lab8.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '9':
          stats.lab9.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab9.tue = stats.lab9.tue + 1;
              break;
            case 4:
              stats.lab9.thu = stats.lab9.thu + 1;
              break;
            case 6:
              stats.lab9.sat = stats.lab9.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '10':
          stats.lab10.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab10.tue = stats.lab10.tue + 1;
              break;
            case 4:
              stats.lab10.thu = stats.lab10.thu + 1;
              break;
            case 6:
              stats.lab10.sat = stats.lab10.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '11':
          stats.lab11.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab11.tue = stats.lab11.tue + 1;
              break;
            case 4:
              stats.lab11.thu = stats.lab11.thu + 1;
              break;
            case 6:
              stats.lab11.sat = stats.lab11.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '12':
          stats.lab12.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab12.tue = stats.lab12.tue + 1;
              break;
            case 4:
              stats.lab12.thu = stats.lab12.thu + 1;
              break;
            case 6:
              stats.lab12.sat = stats.lab12.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '13':
          stats.lab13.requests.push(request);

          switch (getDay(request.date)) {
            case 2:
              stats.lab13.tue = stats.lab13.tue + 1;
              break;
            case 4:
              stats.lab13.thu = stats.lab13.thu + 1;
              break;
            case 6:
              stats.lab13.sat = stats.lab13.sat + 1;
              break;
            default:
              break;
          }

          break;
        case '14':
          switch (getDay(request.date)) {
            case 2:
              stats.lab14.tue = stats.lab14.tue + 1;
              break;
            case 4:
              stats.lab14.thu = stats.lab14.thu + 1;
              break;
            case 6:
              stats.lab14.sat = stats.lab14.sat + 1;
              break;
            default:
              break;
          }

          stats.lab14.requests.push(request);
          break;
      }
    });
    const statsArray = [];

    statsArray.push(stats.lab1);
    statsArray.push(stats.lab2);
    statsArray.push(stats.lab3);
    statsArray.push(stats.lab4);
    statsArray.push(stats.lab5);
    statsArray.push(stats.lab6);
    statsArray.push(stats.lab7);
    statsArray.push(stats.lab8);
    statsArray.push(stats.lab9);
    statsArray.push(stats.lab10);
    statsArray.push(stats.lab11);
    statsArray.push(stats.lab12);
    statsArray.push(stats.lab13);
    statsArray.push(stats.lab14);

    res.json(statsArray);
  });
});

/**
 *
 * so far, this is the only http request that refers to the stats.
 * but I think I'll change this route to come from a file calles
 * stats.js, that'll use both classes to output results.
 *
 * I think this'll be better because then it'll be more organized
 *
 * @route   GET api/stats/totals
 * @desc    get the the stats for everyone in the lab!
 * @access  Private
 */

router.get(
  '/totals',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //get all of the users!

    var totalRequests = 0;
    var totalTimesLoggedIn = 0;

    User.find({})
      .then(users => {
        for (var i = 0; i < users.length; i++) {
          totalRequests += users[i].numberOfRequests;
          totalTimesLoggedIn += users[i].timesLoggedIn;
        }

        const stats = {
          requests: totalRequests,
          logins: totalTimesLoggedIn
        };
        res.json(stats);
      })
      .catch();
  }
);

/**
 *
 * this endpoint will return the people who are logged in!
 *
 * @route   GET api/stats/loggedin
 * @desc    find the users currently logged in
 *          super simple response
 * @access  Public
 */

router.get('/loggedin', (req, res) => {
  User.find({ isLoggedIn: true })
    .then(users => {
      //get the total of objects
      const total = { count: Object.keys(users).length };
      return res.json(total);
    })
    .catch(err => res.json(err));
});

module.exports = router;
