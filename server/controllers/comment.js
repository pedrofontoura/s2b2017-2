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
        comment.save(function (err, res) {
          if (err) {
            // Internal Server Error
            res.status(500).send(err.errmsg);
            console.log(err)
          } else {
            console.log(project.id)
            console.log(res._id)
            project.comments.push(res._id)
            project.save(function (err, res) {
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
  }
}
