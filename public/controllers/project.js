var projectControllers = angular.module('projectControllers', []);

projectControllers.controller('newProject', function($scope, $http){
  console.log('testing projectController')
  $scope.onSubmit = newProject;
  function newProject(){
    $http.post('http://localhost:8080/api/project', $scope.newProject).then(function(data) {
    });
  }
})

userControllers.controller('getAllProjects', function($scope, $http) {
  getAllProjects();
  function getAllProjects(){
    $http.get('http://localhost:8080/api/project').then(function(projects){
      $scope.projects = projects.data;
    })
  }
});
