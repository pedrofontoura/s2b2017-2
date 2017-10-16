var Project = require('../models/project');
var Comment = require('../models/comment');

module.exports = {
  // Cria um novo projeto na base de dados
  createProject: function (req, res) {
    var project = new Project();
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
          // Internal Server Error
          res.status(500).send(err.errmsg);
          console.log(err.errmsg);
        } else {
          // Created
          res.status(201).send('The project has been created');
          console.log('A project has been created');
        }
      });
    }
  },
  // Recupera todos os projetos existentes na base de dados
  getAllProjects: function (req, res) {
    Project.find({}, function (err, content) {
      if (err) {
        // Internal Server Error
        res.status(500).send(err.errmsg);
        console.log(err);
      } else if (res.lenght == 0) {
        // Not Found
        res.status(404).json({ mensagem: 'empty resource' })
        console.log('Empty search.');
      } else {
        // OK
        res.status(200).json(content)
        console.log('A content has been sent (getAllProjects)');
      }
    })
  },
  // Recupera um projeto específico da base de dados (id)
  getProjectById: function (req, res) {
    if (req.params && req.params.id) {
      Project.findOne({ _id: req.params.id }, function (err, content) {
        if (err) {
          // Internal Server Error
          res.status(500).send(err.errmsg);
          console.log(err.errmsg);
        } else if (!content) {
          // Not Found
          res.status(404).json({ message: 'Project not found' });
          console.log('Project not found');
        } else {
          // OK
          res.status(200).json(content);
          console.log('Comment ' + req.params.id + ' has been accessed');
        }
      })
    }
  },
  // Remove um comentário específico da base de dados (id)
  deleteProjectById: function (req, res) {
    if (req.params && req.params.id) {
      Project.findOne({ _id: req.params.id }, function (err, content) {
        if (err) {
          // Internal Server Error
          res.status(500).send(err.errmsg);
          console.log(err.errmsg);
        } else if (!content) {
          // Not Found
          res.status(404).json({ message: 'Project not found' });
          console.log('Project not found');
        } else {
          // Deletando os comentários do projeto
          for (var comment of content.comments) {
            Comment.findOneAndRemove({ _id: comment._id }); // sem handlers
            console.log('comment deleted')
          }
          // Deletando o projeto
          Project.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) {
              // Internal Server Error
              res.status(500).send(err.errmsg);
              console.log(err.errmsg);
            } else {
              // OK
              res.status(200).send('The project has been deleted');
              console.log('A project has been deleted');
            }
          });
        }
      });
    }
  }
}
