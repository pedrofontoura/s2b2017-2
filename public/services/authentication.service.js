(function () {
    angular
        .module('meanApp')
        .service('authentication', authentication);
    authentication.$inject = ['$http', '$window'];

    function authentication($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        // This method will need to call the getToken method to try and read the mean-token from local storage. 
        // If the token exists, the method will also need to validate that the JWT has not expired.
        var isLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        // Get the details of the logged in user
        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        register = function (user) {
            return $http.post('/api/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        login = function (user) {
            return $http.post('/api/login', user).success(function (data) {
                saveToken(data.token);
            });
        };

        logout = function () {
            $window.localStorage.removeItem('mean-token');
        };
        return {
            saveToken: saveToken,
            getToken: getToken,
            logout: logout
        };
    }
})();