// Criação do módulo e injeção de dependências
var appRoutes = angular.module('appRoutes', ['ngRoute'])

// Inializando configurações de rota
appRoutes.config(function($routeProvider,$locationProvider) {

  // Removendo # da URL
  $locationProvider.html5Mode(true);

  $routeProvider

  .when('/', {
    templateUrl: 'views/pages/home.html'
  })
  .when('/register', {
    templateUrl: 'views/pages/register.html',
    controller: 'newUser'
  })
  .when('/projects', {
    templateUrl: 'views/pages/projects.html',
    controller: 'getAllProjects'
  })
  .when('/projects/:id', {
    templateUrl: 'views/pages/project.html',
    controller: 'getProjectById'
  })
  .otherwise ({ redirectTo: '/' });

})
