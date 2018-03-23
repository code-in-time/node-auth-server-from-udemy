const Authentcation = require('./controllers/authentication');

module.exports = function(app) {

    app.post('/signup', Authentcation.signup);

    // app.get('/', function(req, res, next) {
    //     res.send(['surf', 'water', 'house']);

    // });


}