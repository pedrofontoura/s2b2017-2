var app = angular.module('s2bApp', []);


app.controller('projectController', function($scope, $http){
  $scope.onSubmit = createPost;

  function init(){
    getAllProjects();
  }
  init();

  function createPost() {
    $http.post('http://localhost:8080/api/project', $scope.project).then(function(){
      getAllProjects();
    })
  }
  function getAllProjects(){
    $http.get('http://localhost:8080/api/project').then(function(projects){
      $scope.projects = projects.data;
    })
  }
});
