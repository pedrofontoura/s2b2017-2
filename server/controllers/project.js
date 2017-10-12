var Project = require('../models/project');

module.exports = {
  newProject: function(req,res){
    var project = new Project();
    console.log(req)
    project.title = req.body.title; // Uses body-parser to parse http body json
    project.description = req.body.description;
    // project.places = req.body.places;
    // project.startDate = req.body.startDate;
    // project.endDate = req.body.endDate;
    // project.postDate = ???
    if (req.body.title == null || req.body.title == "" || req.body.description == null || req.body.description == "") {
      res.send('Ensure title and description were provided');
    } else {
      project.save(function (err) {
        if (err) {
          res.status(500).send(err.errmsg);
        } else {
          res.status(200).send('The project has been created');
          console.log('A project has been created');
        }
      });
    }
  },
  getAllProjects: function(req, res){
      Project.find({}, function (err, content){
        if(err) {
          console.log(err);
          res.status(500).json(err)
        } else if(res.lenght==0) {
          console.log('Empty search.');
          res.status(404).json({mensagem:'empty resource'})
        } else {
          res.status(201).json(content)
          console.log('A content has been sent');
        }
      })
  },
  getProjectById: function(req, res){
    if(req.params && req.params.id) {
      Project.findOne({_id:req.params.id}, function(err, content) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else if (!content) {
          console.log('Project not fount');
          res.status(404).json({message:'Project not found'});
        } else {
          console.log(JSON.stringify(content));
          res.status(200).json(content);
        }
      })
    }
  }
}
