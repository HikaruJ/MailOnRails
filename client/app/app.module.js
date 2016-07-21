(function() {
    "use strict";

    var angular = require('angular');
    var angularCookie = require('angular-cookie');
    var angularMessages = require('angular-messages');
    var uiBootstrap = require('angular-bootstrap');
    var uiRouter = require('angular-ui-router');

    var angularConfig = require('./app.constants');
    var angularRoutes = require('./app.routes');

    var authModule = require('./modules/auth/auth.module');
    var homeModule = require('./modules/home/home.module');
    var loginModule = require('./modules/login/login.module');
    var mailModule = require('./modules/mail/mail.module');
    var registerModule = require('./modules/register/register.module');

    require('../dist/js/templates.min.js');

    var app = angular.module("mail_on_rails", [
            angularCookie.name,
            angularMessages.name,
            'angularPartials',
            authModule.name,
            homeModule.name,
            loginModule.name,
            mailModule.name,
            registerModule.name,
            uiBootstrap.name,
            uiRouter.name
        ])
        .config(angularRoutes)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authService');
        })
        .constant('angularConfig', angularConfig);
}());