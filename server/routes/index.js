var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});
var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');
var ctrlComment = require('../controllers/comment');
var ctrlUser = require('../controllers/user');
var ctrlAuth = require('../controllers/authentication');

module.exports = function (router) {

  // Projetos
  router.get('/projects/search/', ctrlProject.searchProject)
  router.get('/projects/:id', ctrlProject.getProjectById);
  router.get('/projects', ctrlProject.getAllProjects);
  router.post('/projects', ctrlProject.createProject);
  router.delete('/projects/:id', ctrlProject.deleteProjectById);
  router.put('/projects/:id', ctrlProject.editProjectById)

  // Comentários
  router.get('/comments/:id', ctrlComment.getCommentById);
  router.get('/projects/comments/:id', ctrlComment.getProjectComments);
  router.post('/comments', ctrlComment.createComment);
  router.delete('/comments/:id', ctrlComment.deleteCommentById);
  router.put('/comments/:id', ctrlComment.editCommentById);

  // Perfil de usuário
  router.post('/user', ctrlUser.createUser);

  // Autenticação
  return router;
}
