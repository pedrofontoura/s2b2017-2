var projectControllers = angular.module('projectControllers', []);

projectControllers.controller('newProject', function($scope, $http){
  console.log('testing projectController')
  $scope.onSubmit = newProject;
  function newProject(){
    $http.post('http://localhost:8080/api/projects', $scope.newProject).then(function(data) {
      console.log(data)
    });
  }
})

projectControllers.controller('getAllProjects', function($scope, $http) {
  getAllProjects();
  function getAllProjects(){
    $http.get('http://localhost:8080/api/projects').then(function(projects){
      $scope.projects = projects.data;
    });
  }
})

projectControllers.controller('getProjectById', function($scope, $http, $routeParams) {
  $scope.getProjectById = function (){
    console.log('entrou aqui')
    var id = $routeParams.id;
    console.log(id);
    $http.get('/api/projects/'+id).then(function(data) {
      $scope.project = data.data;
      console.log(data.data)
    });
  }
})
