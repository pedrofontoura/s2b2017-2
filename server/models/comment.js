var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  _project: {type: Schema.Types.ObjectId, ref: 'Project', required:true},
  text: {type: String},
  postDate: {type: Date, required: true, default: Date.now},
  lastDate: {type: Date, required: true, default: Date.now},
  editFlag: { type: Boolean, default: false }
})

module.exports = mongoose.model('Comment', CommentSchema);
