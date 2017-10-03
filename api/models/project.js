var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  title: {type: String, required:true},
  description: {type: String, required:true},
})

module.exports = mongoose.model('Project', UserSchema);
