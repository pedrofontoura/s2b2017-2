var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');

module.exports = function(router){
  router.post('/user', ctrlUser.newUser)
  router.post('/project', ctrlProject.newProject);
  router.get('/project', ctrlProject.getAllProjects);
  return router;
}
