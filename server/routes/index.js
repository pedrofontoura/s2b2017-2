var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');
var ctrlComment = require('../controllers/comment');

module.exports = function(router){
  router.post('/user', ctrlUser.newUser);
  router.get('/projects/comments/:id', ctrlComment.getProjectComments);
  router.get('/projects', ctrlProject.getAllProjects);
  router.post('/projects', ctrlProject.createProject);
  router.get('/projects/:id', ctrlProject.getProjectById);
  router.delete('/projects/:id', ctrlProject.deleteProjectById);
  router.post('/comments', ctrlComment.createComment);
  router.put('/comments/:id', ctrlComment.editCommentById);
  router.get('/comments/:id', ctrlComment.getCommentById);
  router.delete('/comments/:id', ctrlComment.deleteCommentById);
  return router;
}
