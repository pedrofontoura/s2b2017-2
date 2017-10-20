// Criação do módulo e injeção de dependências
var projectControllers = angular.module('projectControllers', []);

// Função que adiciona um novo projeto [POST]
projectControllers.controller('newProject', function($scope, $http){
  console.log('entrou na view')
  $scope.onSubmit = newProject;
  function newProject(){
    console.log('entrou na função')
    console.log($scope.newProject)
    $http.post('http://localhost:8080/api/projects', $scope.newProject).then(function(data) {
      $scope.getAllProjects();
      $scope.resetForm = function() {
        $scope.newProject = angular.copy($scope.master);
      };
      $scope.resetForm();
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
      var date = $scope.project.startDate
      date = new Date(date)
      $scope.project.startDate = ((date.getDate()) + "/" + (date.getMonth()+1) + "/" + (date.getFullYear()))
      var date = $scope.project.endDate
      date = new Date(date)
      $scope.project.endDate = ((date.getDate()) + "/" + (date.getMonth()+1) + "/" + (date.getFullYear()))
      $scope.icon = $scope.project.workArea
      console.log($scope.icon)
      if ($scope.project.workArea == 'environment') {
        $scope.project.workArea = "Meio Ambiente"
      } else if ($scope.project.workArea == 'education') {
        $scope.project.workArea = "Educação"
      } else if ($scope.project.workArea == 'cultural') {
        $scope.project.workArea = "Cultura"
      } else if ($scope.project.workArea == 'health') {
        $scope.project.workArea = "Saúde"
      } else {
        $scope.project.workArea = "Social"
      }
    });
  }
})

// Função que busca por um projeto baseado nas opções selecionadas pelo usuário [GET]
projectControllers.controller('searchProject', function($scope, $http) {
  // $scope.onSearch = searchProject;
  function searchProject(){
    console.log('entrou aqui2')
    $http({
        url: '/api/projects/search/',
        method: "GET",
        params: { location:    $scope.search.location  ,
                  workArea:    $scope.search.workArea  ,
                  startDate:   $scope.search.startDate ,
                  endDate:     $scope.search.endDate   ,
                  searchText:  $scope.search.searchText
        }
     }).then(function(content) {
       console.log(content)
     })
   }
})

projectControllers.controller('quickSearch', function($scope, $location) {
  $scope.onSearch = quickSearch;
  function quickSearch(){
    console.log('entrou aqui')
    var text = $scope.quickSearchText
    $location.path( "/projects" );
  }
})
