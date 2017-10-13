var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');
var ctrlComment = require('../controllers/comment');

module.exports = function(router){
  router.get('/projects/comments/:id', ctrlComment.getProjectComments);
  router.get('/projects/:id', ctrlProject.getProjectById);
  router.get('/projects', ctrlProject.getAllProjects);
  router.post('/projects', ctrlProject.createProject);
  router.delete('/projects/:id', ctrlProject.deleteProjectById);
  router.get('/comments/:id', ctrlComment.getCommentById);
  router.post('/comments', ctrlComment.createComment);
  router.delete('/comments/:id', ctrlComment.deleteCommentById);
  router.post('/user', ctrlUser.newUser);
  return router;
}
