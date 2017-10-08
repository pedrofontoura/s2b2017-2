var Comment = require('../models/coment');

module.exports = {
  //(post)
  newComment: function(req,res){
    var comment = new Comment();
    comment.author  = req.body.author;
    comment.project = req.body.project;
    comment.content = req.body.content;
    if (req.body.author == null || req.body.author == "" || req.body.project == null || req.body.project == "" || req.body.content == null || req.body.content == "") {
      res.send('Ensure all requested data have been provided');
    } else {
      comment.save(function (err) {
        if (err) {
          res.status(500).send(err.errmsg);
        } else {
          res.status(200).send('The comment has been inserted');
          console.log('The comment has been inserted');
        }
      });
    }
  }
}
