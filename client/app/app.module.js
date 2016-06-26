(function() {
    "use strict";

    var angular = require('angular');
    var angularBootstrap = require('angular-bootstrap-npm');
    var angularMessages = require('angular-messages');

    var angularConfig = require('./app.constants');
    var angularRoutes = require('./app.routes');

    var homeModule = require('./modules/home/home.module');
    var registerModule = require('./modules/register/register.module');
    var uiRouter = require('angular-ui-router/release/angular-ui-router');

    require('../dist/js/templates.min.js');

    var app = angular.module("mail_on_rails", [
            angularBootstrap,
            angularMessages,
            'angularPartials',
            homeModule.name,
            registerModule.name,
            uiRouter
        ])
        .config(angularRoutes)
        .constant('angularConfig', angularConfig);
}());