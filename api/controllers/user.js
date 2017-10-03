var User = require('../models/user');

//(post)
module.exports.newUser = function(req,res){
  var user = new User();
  user.username = req.body.username; // Uses body-parser to parse http body json
  user.password = req.body.password;
  user.email = req.body.email;
  if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "") {
    res.send('Ensure username, email, and password were provided');
  } else {
    user.save(function (err) {
      if (err) {
        if (err.code == 11000){
          res.send('E-mail or username already exist')
        } else {
        res.send(err.errmsg)
        }
      } else {
        res.send('User created!')
      }
    });
  }
};
