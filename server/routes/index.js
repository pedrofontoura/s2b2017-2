var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');
var ctrlComment = require('../controllers/comment');

module.exports = function(router){
  router.post('/user', ctrlUser.newUser)
  router.post('/projects', ctrlProject.newProject);
  router.get('/projects', ctrlProject.getAllProjects);
  router.get('/projects/:id', ctrlProject.getProjectById);
  router.post('/comments', ctrlComment.addComment);
  return router;
}
