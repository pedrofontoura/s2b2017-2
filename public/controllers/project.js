// Criação do módulo e injeção de dependências
var projectControllers = angular.module('projectControllers', []);

// Função que adiciona um novo projeto [POST]
projectControllers.controller('newProject', function($scope, $http){
  console.log('testing projectController')
  $scope.onSubmit = newProject;
  function newProject(){
    $http.post('http://localhost:8080/api/projects', $scope.newProject).then(function(data) {
      console.log(data)
    });
  }
})

// Função que busca todos os projetos existentes [GET]
projectControllers.controller('getAllProjects', function($scope, $http) {
  getAllProjects();
  function getAllProjects(){
    $http.get('http://localhost:8080/api/projects').then(function(projects){
      $scope.projects = projects.data;
    });
  }
})

// Função que busca um projeto específico a partir do seu id [GET] 
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
