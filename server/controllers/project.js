var Project = require('../models/project');
var Comment = require('../models/comment');

module.exports = {
  // Cria um novo projeto na base de dados
  createProject: function (req, res) {
    if (req.body.title == null || req.body.title == "" || req.body.description == null || req.body.description == "" ||  req.body.workArea == null || req.body.workArea == "" || req.body.local == null || req.body.local == "" ) {
      res.send('Ensure title and description were provided');
    } else {
      var project = new Project();
      project.title = req.body.title;
      project.description = req.body.description;
      project.local = req.body.local;
      project.workArea = req.body.workArea;
      project.postDate = Date.now();
      project.startDate = strToDate(req.body.startDate);
      project.endDate = strToDate(req.body.endDate);
      project.save(function (err) {
        if (err) {
          // Internal Server Error
          res.status(500).send(err.errmsg);
          console.log(err);
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
        console.log('A content has been sent');
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
        }
      })
    }
  },
  // Remove um projeto específico da base de dados (id)
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
  },
  // Faz uma varredura no banco de dados, filtrando projetos de acordo com as especificações passadas pelo usuário (id)
  searchProject: function (req, res) {

    var local = req.query.location;
    var workArea = req.query.workArea;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var searchText = req.query.searchText;
    var result

    if(startDate!=null && startDate!='' && !testDate(startDate)) {
      res.status(400).send('invalid startDate');
    } else if (endDate!=null && endDate!='' && !testDate(endDate)) {
      res.status(400).send('Invalid endDate');
    } else if (workArea!='education' && workArea!='social' && workArea!='cultural' && workArea!='environment' && workArea!='health' && workArea!=null && workArea!=''){
      res.status(400).send('Invalid workArea');
    } else {
      Project.find({}, function (err, content) {
        if (err) {
          res.status(500).json({ mensagem: 'Internal server error' })
          console.log('Internal server error');
        } else if (!content) {
          res.status(404).json({ mensagem: 'empty resource' })
          console.log('Empty search.');
        } else {
           isEqual('local', local, content, function(result){

           } )
        }
      });
    }
  },
  // Edita um projeto (put)
  editProjectById: function(req, res){
    if(req.params && req.params.id) {
      if(req.params.id === req.body._id) {
        Project.findOne({_id:req.params.id}, function (err, project) {
          if(err) {
            // Internal Server Error
            console.log(err.errmsg);
            res.status(500).send(err.errmsg);
          } else if (!project) {
            // Not Found
            console.log('Project not found')
            res.status(404).json({mensagem:'Project not found'})
          } else {
            project.title = req.body.title;
            project.description = req.body.description;
            project.local = req.body.local;
            project.workArea = req.body.workArea;
            project.lastDate = Date.now();
            project.editFlag = true;
            project.startDate = strToDate(req.body.startDate);
            project.endDate = strToDate(req.body.endDate);
            project.save(function (err) {
              if(err) {
                console.log(err);
                res.status(500).send(err.errmsg);
              } else {
                console.log('A project has been edited');
                res.status(200).json(project);
              }
            });
          }// Internal Server Error
        });
      }
    }
  }
}
