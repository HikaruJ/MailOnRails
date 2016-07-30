(function() {
    "use strict";

    var angular = require('angular');
    var angularCookie = require('angular-cookie');
    var angularLocalStorage = require('angular-local-storage');
    var angularMessages = require('angular-messages');
    var uiRouter = require('angular-ui-router');

    var angularConfig = require('./app.constants');
    var angularRoutes = require('./app.routes');

    var extensionsModule = require('./modules/extensions/extensions.module');
    var homeModule = require('./modules/home/home.module');
    var loginModule = require('./modules/login/login.module');
    var mailModule = require('./modules/mail/mail.module');
    var oauthModule = require('./modules/oauth/oauth.module');
    var registerModule = require('./modules/register/register.module');

    require('../dist/js/templates.min.js');

    var app = angular.module("mail_on_rails", [
            angularCookie.name,
            angularLocalStorage.name,
            angularMessages.name,
            'angularPartials',
            extensionsModule.name,
            homeModule.name,
            loginModule.name,
            mailModule.name,
            oauthModule.name,
            registerModule.name,
            uiRouter.name
        ])
        .config(angularRoutes)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('oauthInterceptor');
        })
        .constant('angularConfig', angularConfig);
}());