var Comment = require('../models/comment');
var Project = require('../models/project');


module.exports = {
  addComment: function(req, res) {
    console.log('entrou aqui')
    console.log(req.body.id)
    console.log(req.body.text)
    Project.findOne({_id:req.body.id}, function(err, project) {
      if(err){
        // <-------------------------------------------------------- add handler
        console.log('caiu aqui1')
      } else if (!project) {
        // <-------------------------------------------------------- add handler
        console.log('caiu aqui2')
      } else if (req.body.text == null) {
        // <-------------------------------------------------------- add handler
        console.log('caiu aqui3')
      } else {
        var comment = new Comment();
        comment.text = req.body.text
        comment._project = req.body.id
        comment.save(function (err, res) {
          if (err) {
            // <---------------------------------------------------- add handler
            console.log('caiu aqui4')
          } else {
            console.log(project.id)
            console.log(res._id)
            project.comments.push(res._id)
            project.save(function (err, res) {
              if (err) {
                // <------------------------------------------------ add handler
              } else {
                console.log('deu certo!')
              }
            })
          }
        });
      }
    });
  }
}
