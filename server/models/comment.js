var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User',  required:true}
  project: {type: Schema.Types.ObjectId, ref: 'Project', required:true}
  content: {type: String, required:true},
  // time: {type: Number, required: true},
})

module.exports = mongoose.model('Project', ProjectSchema);
