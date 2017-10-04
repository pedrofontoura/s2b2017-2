var Project = require('../models/project');

//(post)
module.exports.newProject = function(req,res){
  var project = new Project();
  project.title = req.body.title; // Uses body-parser to parse http body json
  project.description = req.body.description;
  console.log(project.title);
  if (req.body.title == null || req.body.title == "" || req.body.description == null || req.body.description == "") {
    res.send('Ensure title and description were provided');
  } else {
    project.save(function (err) {
      if (err) {
        res.send(err.errmsg)
      } else {
        res.send('OPA!')
      }
    });
  }
};
