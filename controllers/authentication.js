const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tockenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next) {
    // give token
    //res.send({token:tokenForUser(req.user)});

}


exports.signup = function(req, res, next) {
    //res.send({ sucess: 'true'});
    // See If user with email exists
    const email = req.body.email;
    const password = req.body.password;

    // Check for no user and password
    if (!email || !password) {
        return res.status(422).send({error:'no email or password'});
    }

    User.findOne({email:email}, function(err, existingUser) {
        if (err) {return next(err); }
        
        // If a user with email does exist , return an error
        if (existingUser) {
            return res.status(422).send({error:'Email is in use'});
        }

        // If a user with email does not exist , create and save user record
        const user = new User({
            email: email,
            password: password
        })



        // Respond to request indicating user was created
        user.save(function(err) {
            if (err) {return next(err); }

            // Rspond with the created user
            // res.json(user); 
            // res.json({success: true});
            res.json({ token: tockenForUser(user)});
        })
        
    });
}