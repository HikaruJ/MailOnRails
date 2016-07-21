(function() {
    "use strict";

    var angular = require('angular');
    var loginOptions = require('./login.component');
    var loginService = require('./login.factory');

    module.exports = angular.module('login', [])
        .component('login', loginOptions)
        .factory('loginService', loginService);
}());