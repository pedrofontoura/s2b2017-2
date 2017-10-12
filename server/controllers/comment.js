var Comment = require('../models/comment');
var Project = require('../models/project');

module.exports = {
  addComment: function(req, res) {
    console.log('entrou aqui')
    console.log(req.body.id)
    console.log(req.body.text)
    Project.findOne({_id:req.body.id}, function(err, project) {
      if(err){
        // Internal Server Error
        res.status(500).send(err.errmsg);
        console.log(err)
      } else if (!project) {
        // Not Found
        res.status(404).send(err.errmsg);
        console.log(err)
      } else if (req.body.text == null) {
        // Bad Request
        res.status(400).send(err.errmsg);
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
            console.log(project.id)
            project.comments.push(comment._id)
            project.save(function (err) {
              if (err) {
                // Internal Server Error
                res.status(500).send(err.errmsg);
                console.log(err)
              } else {
                res.status(200).send('The comment has been created');
                console.log('A comment has been created');
              }
            })
          }
        });
      }
    });
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
        res.status(404).send(err.errmsg);
        console.log(err)
      } else {
        Comment.find({ _id : { $in : project.comments }}, function(err,content) {
          // OK
          res.status(200).send(content);
        });
      }
    });
  }
}
