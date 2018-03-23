const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// Setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};



// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if the user id exisat in the db

    // if it does, call doneelse call done witout the user object
    User.findById(payload.sub, function(err, user) {
        if(err) {return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});




// Tell passport to use this strategy
passport.use(jwtLogin);