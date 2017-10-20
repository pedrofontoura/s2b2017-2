// Criação do módulo e injeção de dependências
var projectControllers = angular.module('projectControllers', []);

// Função que adiciona um novo projeto [POST]
projectControllers.controller('newProject', function($scope, $http){
  $scope.onSubmit = newProject;
  function newProject(){
    console.log($scope.newProject)
    $http.post('http://localhost:8080/api/projects', $scope.newProject).then(function(data) {
      $scope.getAllProjects();
    });
  }
})

// Função que busca todos os projetos existentes [GET]
projectControllers.controller('getAllProjects', function($scope, $http) {
  $scope.getAllProjects = function(){
    $http.get('http://localhost:8080/api/projects').then(function(projects){
      $scope.projects = projects.data;
      projects.data.forEach(function(element, index, array){
        var date = projects.data[index].startDate
        date = new Date(date)
        projects.data[index].startDate = ((date.getDate()) + "/" + (date.getMonth()+1) + "/" + (date.getFullYear()))
      });
      projects.data.forEach(function(element, index, array){
        var date = projects.data[index].endDate
        date = new Date(date)
        projects.data[index].endDate = ((date.getDate()) + "/" + (date.getMonth()+1) + "/" + (date.getFullYear()))
      });
    });
  }
})

// Função que busca um projeto específico a partir do seu id [GET]
projectControllers.controller('getProjectById', function($scope, $http, $routeParams) {
  $scope.getProjectById = function (){
    var id = $routeParams.id;
    $http.get('/api/projects/'+id).then(function(data) {
      $scope.project = data.data;
    });
  }
})

// Função que busca por um projeto baseado nas opções selecionadas pelo usuário [GET]
projectControllers.controller('searchProject', function($scope, $http) {
  console.log('entrou aqui1')
  $scope.onSearch = searchProject;
  function searchProject(){
    console.log('entrou aqui2')
    $http({
        url: '/api/projects/search/',
        method: "GET",
        params: { location:   $scope.searchProject.location  ,
                  workArea:   $scope.searchProject.workArea  ,
                  startDate:  $scope.searchProject.startDate ,
                  endDate:    $scope.searchProject.endDate   ,
        }
     })
   }
})
