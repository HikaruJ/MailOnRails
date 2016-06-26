(function() {
    "use strict";

    var angular = require('angular');

    var registerDirective = require('./register.directive');
    var registerService = require('./register.factory');

    var passwordInput = require('./components/input/password/password.directive');

    module.exports = angular.module('register', [])
        .directive('passwordInput', passwordInput)
        .directive('register', registerDirective)
        .factory('registerService', registerService);
}());