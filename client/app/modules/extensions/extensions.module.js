(function() {
    "use strict";

    var angular = require('angular');
    var uiBootstrap = require('angular-bootstrap');
    var modalService = require('./components/modal/modal.factory');

    module.exports = angular.module('extensions', [
            uiBootstrap.name
        ])
        .factory('modalService', modalService);
}());