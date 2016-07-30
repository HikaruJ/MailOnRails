(function() {
    "use strict";

    var angular = require('angular');
    var oauthInterceptor = require('./oauthInterceptor.factory');

    module.exports = angular.module('oauth', [])
        .factory('oauthInterceptor', oauthInterceptor);
}());