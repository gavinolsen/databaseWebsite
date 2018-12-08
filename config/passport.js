//create the passport jwt strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//you'll need model stuff
//comes from your model files
const mongoose = require('mongoose');
const User = mongoose.model('user');

const keys = require('../config/keys');

//wtf is this???
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //get the user sent in the token !

      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            //there's no error, and give back the user
            //console.log(jwt_payload);
            //console.log(user);
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
