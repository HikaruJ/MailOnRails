(function() {
    "use strict";

    var angular = require('angular');
    var angularBootstrap = require('angular-bootstrap');
    var angularMessages = require('angular-messages');

    debugger

    var angularConfig = require('./app.constants');
    var angularRoutes = require('./app.routes');

    var homeModule = require('./modules/home/home.module');
    var mailModule = require('./modules/mail/mail.module');
    var registerModule = require('./modules/register/register.module');
    var uiRouter = require('angular-ui-router');

    require('../dist/js/templates.min.js');

    var app = angular.module("mail_on_rails", [
            angularBootstrap.name,
            angularMessages.name,
            'angularPartials',
            homeModule.name,
            mailModule.name,
            registerModule.name,
            uiRouter.name
        ])
        .config(angularRoutes)
        .constant('angularConfig', angularConfig);
}());