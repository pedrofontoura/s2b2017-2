var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  _project: {type: Schema.Types.ObjectId, ref: 'Project', required:true},
  text: {type: String, required:true},
  createDate:{type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Comment', CommentSchema);
