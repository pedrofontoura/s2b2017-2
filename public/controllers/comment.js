// Criação do módulo e injeção de dependências
var commentControllers = angular.module('commentControllers', [])

// Função que solicita adição de um novo comentário [POST]
commentControllers.controller('newComment',function($scope,$http,$routeParams) {
  $scope.onSubmit = newComment
  function newComment(){
    var newComment = { id : $routeParams.id , text : $scope.text };
    $http.post('http://localhost:8080/api/comments', newComment).then(function(data) {
      $scope.getProjectComments();
    });
  }
});

// Função que solicita todos os comentários vinculados a um determinado projeto [GET]
commentControllers.controller('getProjectComments', function($scope,$http,$routeParams) {
  $scope.getProjectComments = function(){
    var id = $routeParams.id;
    $http.get('http://localhost:8080/api/comments/'+id, $routeParams.id).then(function(comments) {
      $scope.comments = comments.data;
    });
  }
});

//Função que solicita delete de um comentário vinculado a um project [DELETE]
commentControllers.controller('deleteComment', function($scope) {
  $scope.onClick = deleteComment;
  function deleteComment() {
    console.log('chamou bem');
    // var id = ;
    // http.delete('http://localhost:8080/api/comments/'+id).then(function(data) {
    //   $scope.getProjectComments();
    // });
  }
});
