var Project = require('../models/project');
var Comment = require('../models/comment');

module.exports = {
  // Cria um novo projeto na base de dados
  createProject: function (req, res) {
    if (!testDate(req.body.startDate) || !testDate(req.body.endDate)) {
      res.send('Ensure date format are correct typed');
    } else if (req.body.title == null || req.body.title == "" || req.body.description == null || req.body.description == "" ||  req.body.workArea == null || req.body.workArea == "" || req.body.local == null || req.body.local == "" ) {
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
        console.log('A content has been sent (getAllProjects)');
        var fruits   = ['teste', 'teste2'];
        var array = fruits.lenght;
        console.log(array);
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
    res.status(200).send('OK');
    console.log(req.query.location)
    console.log(req.query.workArea)
    console.log(req.query.startDate)
    console.log(req.query.endDate)
    console.log(req.query.searchText)
  }
}


//   var property = req.body.property;
//   var value = req.body.value;
//   var op = req.body.op;
//   var query = {};
//   if (op!=0 && op!=1 && op!=2 && op!=3 && op!=4 && op!=5) {
//     res.status(404).json({ message: 'Invalid Operator' });
//   } else if (op==0) {
//     query[property] = { $eq : value}; // Matches values that are equal to a specified value.
//   } else if (op==1) {
//     query[property] = { $ne : value}; // Matches all values that are not equal to a specified value.
//   } else if (op==2) {
//     query[property] = { $lte : value}; // Matches values that are less than or equal to a specified value.
//   } else if (op==3) {
//     query[property] = { $gte : value}; // Matches values that are greater than or equal to a specified value.
//   } else if (op==4) {
//     query[property] = { $lt : value}; // Matches values that are less than a specified value.
//   } else if (op==5) {
//     query[property] = { $gt : value}; // Matches values that are greater than a specified value.
//   } else {
//      // sla o que aconteceu
//   }
//   Project.find(query, function (err, content) {
//     if (err) {
//       // Internal Server Error
//       res.status(500).send(err.errmsg);
//       console.log(err.errmsg);
//     } else if (!content) {
//       // Not Found
//       res.status(404).json({ message: 'Project not found' });
//       console.log('Project not found');
//     } else {
//       // OK
//       res.status(200).json(content);
//     }
//   })
// }
