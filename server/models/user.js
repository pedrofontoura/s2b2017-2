var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
  //hash: String, // handler para senha
  //salt: String  // handler para senha
})

module.exports = mongoose.model('User', UserSchema);
