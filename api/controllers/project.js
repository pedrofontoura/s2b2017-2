var Project = require('../models/project');

// //(post)
// module.exports.newProject = function(req,res){
//   var project = new Project();
//   project.title = req.body.title; // Uses body-parser to parse http body json
//   project.description = req.body.description;
//
//   if (req.body.title == null || req.body.title == "" || req.body.description == null || req.body.description == "") {
//     res.status(400).send('Ensure title and description were provided');
//   } else {
//     project.save(function (err) {
//       if (err) {
//         res.status(500).send(err.errmsg)
//       }
//         res.status(200).send('The project has been created')
//       }
//     });
//   }
// };
// var Project = require('../models/project');

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
        res.status(500).send(err.errmsg);
      } else {
        res.status(200).send('The project has been created')
      }
    });
  }
};
