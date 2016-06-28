(function() {
    "use strict";

    var angular = require('angular');

    var registerService = require('./register.factory');

    var passwordInputOptions = require('./components/input/password/password.component');
    var registerOptions = require('./register.component');

    module.exports = angular.module('register', [])
        .component('passwordInput', passwordInputOptions)
        .component('register', registerOptions)
        .factory('registerService', registerService);
}());