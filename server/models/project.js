var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const workAreas = ["education", "social", "health", "environment", "cultural"];

var ProjectSchema = new Schema({

  title           : {type: String, required:true},
  description     : {type: String, required:true},
  postDate        : {type: Date, required: true, default: Date.now},
  lastDate        : {type: Date, required: true, default: Date.now},
  startDate       : {type: Date, required: true},
  endDate         : {type: Date, required: true},
  editFlag        : {type: Boolean, default: false },
  workArea        : {type: String, lowercase: true, required: true, enum: workAreas},
  local           : {type: String },
  comments        : [],
  followers       : [],
  participants    : []

})

module.exports = mongoose.model('Project', ProjectSchema);
