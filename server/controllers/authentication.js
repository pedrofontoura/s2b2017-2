var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Step 1: take the data from the submitted form and create a new Mongoose model instance
// Step 2: Call the setPassword method to add the salt and the hash to the instance
// Step 3: Save the instance as a record to the database
// Step 4: Generate a JWT
// Step 5: Send the JWT inside the JSON response
module.exports.register = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            // Internal Server Error
            res.status(500);
            res.json(err);
        } else {
            var token;
            token = user.generateJwt();
            // OK
            res.status(200);
            res.json({
                "token": token
            });
        }
    });
};

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            // Internal Server Error
            res.status(500).json(err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            // OK
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // Unauthorized
            res.status(401).json(info);
        }
    })(req, res);
};