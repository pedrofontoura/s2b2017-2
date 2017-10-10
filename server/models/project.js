var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: {type: String, required:true},
  description: {type: String, required:true},
  comments: []
})

module.exports = mongoose.model('Project', ProjectSchema);
