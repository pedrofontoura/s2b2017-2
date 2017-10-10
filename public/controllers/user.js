// Criação do módulo e injeção de dependências
var userControllers = angular.module('userControllers', [])

// Função que adiciona um novo usuário [POST]
userControllers.controller('newUser', function($scope, $http){
  console.log($scope.newUser)
  $scope.onSubmit = createUser;
  function createUser(){
    $http.post('http://localhost:8080/api/user', $scope.newUser).then(function(data) {
      console.log('Request status: ' + data.data.status);
      console.log(data.data.message);
    });
  }
})
