var app = angular.module('s2bApp', []);

app.controller('projectController', function($scope, $http){
  $scope.formModel = {};
  $scope.onSubmit = function() {
    // Angular Documentation Link: https://docs.angularjs.org/api/ng/service/$http
    // $http.post('/someUrl', data, config).then(successCallback, errorCallback);
    $http.post('http://localhost:8080/api/project', $scope.project)
  }
});
