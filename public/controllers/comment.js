// Criação do módulo e injeção de dependências
var commentControllers = angular.module('commentControllers', [])

// Função que solicita adição de um novo comentário [POST]
commentControllers.controller('newComment',function($scope,$http,$routeParams) {
  $scope.onSend = newComment
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
      comments.data.sort(function(a,b) {
        if(a.postDate < b.postDate) {
          return 1
        }
        if (a.postDate >   b.postDate) {
          return -1
        }
        return 0;
      })
      $scope.comments = comments.data;
      console.log(comments.data)
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
commentControllers.controller('getComment', function($http,$scope) {
  $scope.getComment = function(commentId){
    $http.get('http://localhost:8080/api/comments/'+commentId).then(function(comment) {
      $("#editModal").modal("toggle");
      $scope.comment = comment.data
    }, function errorCallback(err) {
      console.log('Comment not found')
    });
  }
});

// Função que edita um comentário específico a partir do seu id [PUT]
commentControllers.controller('editComment', function($http,$scope,$routeParams) {
  $scope.editComment = function(){
    console.log($scope.comment)
    $http.put('http://localhost:8080/api/comments/'+$scope.comment._id, $scope.comment).then(function() {
      console.log('The comment has been edited')
      $scope.getProjectComments();
      }, function errorCallback(err) {
      console.log('Not possible to edit this comment')
    });
    $("#editModal").modal("hide");
  }
});
