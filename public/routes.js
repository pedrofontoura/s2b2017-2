angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: 'views/pages/home.html'
  })
  .when('/about', {
    templateUrl: 'views/pages/about.html'
  });
})
