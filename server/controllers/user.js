var User = require('../models/user');

module.exports = {

  // Função que registra um novo usuário [POST]
  createUser: function (req, res) {
    var user = new User();
    user.email = req.body.email
    user.name = req.body.name
    user.password = req.body.password
    user.save(function (err) {
      if (err) {
        // Internal Server Error
        res.status(500).send(err.errmsg);
        console.log(err)
      } else {
        // Created
        res.status(201).send('The user has been created');
        console.log('A user has been created');
      }
    });
  }
}