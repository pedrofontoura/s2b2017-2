// Criação do módulo e injeção de dependências
var appRoutes = angular.module('appRoutes', ['ngRoute'])

// Inializando configurações de rota
appRoutes.config(function($routeProvider,$locationProvider) {

  // Removendo # da URL
  $locationProvider.html5Mode(true);

  $routeProvider

  // Página home
  .when('/', {
    templateUrl: 'views/pages/home.html'
  })

  // Página de registro
  .when('/register', {
    templateUrl: 'views/pages/register.html',
    controller: 'registerCtrl',
    controllerAs: 'vm'
  })

  // Página de login
  .when('/login', {
    templateUrl: 'views/pages/user.html',
    controller: 'loginCtrl',
    controllerAs: 'vm'
  })

  // Página de perfil
  .when('/user', {
    templateUrl: 'views/pages/user.html',
    controller: 'userCtrl',
    controllerAs: 'vm'
  })

  // Página about
  .when('/about', {
    templateUrl: 'views/pages/about.html'
  })

  // Página Projects
  .when('/projects', {
    templateUrl: 'views/pages/projects.html',
    controller: 'getAllProjects'
  })

  // Página de um projeto específico
  .when('/projects/:id', {
    templateUrl: 'views/pages/project.html',
    controller: 'getProjectById'
  })

  // Redirect em caso de URL inválida
  .otherwise ({ redirectTo: '/' });

})
