var Comment = require('../models/comment');
var Project = require('../models/project');

module.exports = {

  // Função que adiciona um comentário a um determinado projeto [STATUS]
  createComment: function(req, res) {
    Project.findOne({_id:req.body.id}, function(err, project) {
      if(err){
        // Internal Server Error
        res.status(500).send(err.errmsg);
        console.log(err)
      } else if (!project) {
        // Not Found
        res.status(404).send('Comment not found');
        console.log(err)
      } else if (req.body.text == null || req.body.text == "") {
        // Bad Request
        res.status(400).send('no text');
        console.log(err)
      } else {
        var comment = new Comment();
        comment.text = req.body.text
        comment._project = req.body.id
        comment.save(function (err) {
          if (err) {
            // Internal Server Error
            res.status(500).send(err.errmsg);
            console.log(err)
          } else {
            project.comments.push(comment._id)
            project.save(function (err) {
              if (err) {
                // Internal Server Error
                res.status(500).send(err.errmsg);
                console.log(err);
              } else {
                res.status(201).send('The comment has been created');
                console.log('A comment has been created');
              }
            });
          }
        });
      }
    });
  },

  // Função que deleta um comentário especificado dado o seu _ID [DELETE]
  deleteCommentById: function(req, res) {
    if(req.params && req.params.id) {
      Comment.findById(req.params.id, function(err, comment) {
        if(err) {
          // Internal Server Error
          res.status(500).send(err.errmsg);
          console.log(err.errmsg)
        } else {
          Project.findById(comment._project, function(err, project) {
            if(err) {
              // Internal Server Error
              res.status(500).send(err.errmsg);
              console.log(err.errmsg);
            } else {
              var i = project.comments.indexOf(req.params.id);
              project.comments.splice(i,1);
              project.save(function (err) {
                if (err) {
                  // Internal Server Error
                  res.status(500).send(err.errmsg);
                  console.log(err);
                } else {
                  Comment.findByIdAndRemove(req.params.id, function(err) {
                    if(err) {
                      // Internal Server Error
                      res.status(500).send(err.errmsg);
                      console.log(err.errmsg);
                    } else {
                      // OK
                      res.status(200).send('The comment has been deleted');
                      console.log('A comment has been deleted')
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },

  // Função que entrega os valores das propriedades de um determindo comentário [GET]
  getCommentById: function(req,res){
    console.log('Entrou no getProjectById')
  },

  // Função que edita os valores das propriedades de um determinado comentário [EDIT]
  editCommentById: function(req, res){
    console.log('Entrou no editCommentById')
  },

  // Função que entrega todos os comentários vinculados a um determinado projeto [GET]
  getProjectComments: function(req, res){
    Project.findOne({_id:req.params.id}, function(err, project) {
      if (err) {
        // Internal Server Error
        res.status(500).send(err.errmsg);
        console.log(err)
      } else if (!project) {
        // Not Found
        res.status(404).json({mensagem:'Comment not found'})
        console.log('Comment not found')
      } else {
        Comment.find({ _id : { $in : project.comments }}, function(err,content) {
          // OK
          res.status(200).send(content);
        });
      }
    });
  }
}
