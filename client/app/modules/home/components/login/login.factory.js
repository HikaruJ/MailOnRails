(function() {
    "use strict";

    var loginService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            getUser: baseUrl + '/users/get_user_by_email',
            login: baseUrl + '/oauth/token'
        };

        var service = {
            getUser: getUser,
            loginUser: loginUser
        };

        return service;

        function getUser(username) {
            return $http({
                    url: urls.getUser,
                    method: "post",
                    data: {
                        username: username
                    }
                })
                .then(getUserSuccess)
                .catch(getUserFailed);

            function getUserSuccess(respond) {
                var result = {
                    response: null,
                    status: null
                };

                if (respond === null || respond.data === null) {
                    return result;
                }

                var data = respond.data.response;
                result.response = data.user;
                result.status = respond.status;
                return result;
            }

            function getUserFailed(error) {
                var result = {
                    response: null,
                    status: null
                };

                if (error === null || error.data === null) {
                    return result;
                }

                var data = error.data;
                result.status = error.status;
                return result;
            }
        }

        function loginUser(password, username) {
            return $http({
                    url: urls.login,
                    method: "post",
                    data: $.param({
                        grant_type: 'password',
                        username: username,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(loginUserSuccess)
                .catch(loginUserFailed);

            function loginUserSuccess(respond) {
                var result = {
                    response: null,
                    status: null
                };

                if (respond === null || respond.data === null) {
                    return result;
                }

                var data = respond.data;
                localStorageService.set('oauthData', {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token
                });

                result.status = respond.status;
                return result;
            }

            function loginUserFailed(error) {
                var result = {
                    response: null,
                    status: null
                };

                if (error === null || error.data === null) {
                    return result;
                }

                var data = error.data;
                result.status = error.status;
                return result;
            }
        }
    };

    module.exports = loginService;
}());