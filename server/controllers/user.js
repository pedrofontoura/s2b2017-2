var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.profileRead = function (req, res) {
  if (!req.payload._id) {
    // Unauthorized
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        if (err) {
          // Internal Server Error
          res.status(500).json(err);
        } else if (!user) {
          // Not Found
          res.status(404).json({
            "message": "User not found"
          });
        } else {
          // OK
          res.status(200).json(user);
        }
      });
  }
};
