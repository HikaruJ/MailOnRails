(function() {
    "use strict";

    var angular = require('angular');
    var authService = require('./auth.factory');

    module.exports = angular.module('auth', [])
        .factory('authService', authService);
}());