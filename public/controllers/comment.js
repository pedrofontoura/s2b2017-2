// Criação do módulo e injeção de dependências
var commentControllers = angular.module('commentControllers', [])

// Função que adiciona um novo comentário [POST]
commentControllers.controller('newComment',function($scope,$http,$routeParams) {
  $scope.onSubmit = newComment;
  function newComment(){
    var newComment = { id : $routeParams.id , text : $scope.text };
    $http.post('http://localhost:8080/api/comments', newComment).then(function(data) {
      console.log(data);
    });
  }
});