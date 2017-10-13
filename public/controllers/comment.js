// Criação do módulo e injeção de dependências
var commentControllers = angular.module('commentControllers', [])

// Função que solicita adição de um novo comentário [POST]
commentControllers.controller('newComment',function($scope,$http,$routeParams) {
  $scope.onSubmit = newComment
    function newComment(){
    var newComment = { id : $routeParams.id , text : $scope.comment.text };
    $http.post('http://localhost:8080/api/comments', newComment).then(function(data) {
      $scope.getProjectComments();
      $scope.resetForm = function() {
        $scope.comment = angular.copy($scope.master);
      };
      $scope.resetForm();
    });
  }
});

// Função que solicita todos os comentários vinculados a um determinado projeto [GET]
commentControllers.controller('getProjectComments', function($scope,$http,$routeParams) {
  $scope.getProjectComments = function(){
    var id = $routeParams.id;
    $http.get('http://localhost:8080/api/projects/comments/'+id).then(function(comments) {
      $scope.comments = comments.data;
    });
  }
});

// Função que solicita delete de um comentário vinculado a um project [DELETE]
commentControllers.controller('deleteComment', function($http,$scope) {
  $scope.deleteComment = function(commentId){
    $http.delete('http://localhost:8080/api/comments/'+commentId).then(function(comments) {
      $scope.getProjectComments();
    });
  }
});

// Função que busca um comentário específico a partir do seu id [GET]
commentControllers.controller('editComment', function($http,$scope) {
  $(".myBtn").click(function(){
         $("#editModal").modal("toggle");
     });
});
