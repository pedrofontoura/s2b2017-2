var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Usando o e-mail como username
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  // Função de validação de usuário
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // User não encontrado
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Senha inválida
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // User válido
      return done(null, user);
    });
  }
));