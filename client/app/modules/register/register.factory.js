'use strict';

var registerService = function ($http, $log, angularConfig) {
    var baseUrl = angularConfig.baseUrl;

    var urls = {
      register: baseUrl + '/api/register'
    };

    var service = {
      registerUser: registerUser
    };

    return service;

    function registerUser(user) {
      return $http.post(urls.register, user)
        .then(registerUserSuccess)
        .catch(registerUserFailed);

        function registerUserSuccess(response) {
          return true;
        }

        function registerUserFailed(error) {
          $log.error('XHR Failed for registerUserFailed.' + error.data);
        }
    };
}

module.exports = registerService;
