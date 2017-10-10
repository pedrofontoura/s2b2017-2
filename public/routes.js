var appRoutes = angular.module('appRoutes', ['ngRoute'])

appRoutes.config(function($routeProvider,$locationProvider) {

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
