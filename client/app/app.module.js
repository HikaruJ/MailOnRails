'use strict';

var angular = require('angular');
var angularConfig = require('./app.constants');
var angularRoutes = require('./app.routes');

var homeModule = require('./modules/home/home.module');
var registerModule = require('./modules/register/register.module');
var uiRouter = require('angular-ui-router/release/angular-ui-router');

require('../dist/js/templates.min.js');

var app = angular.module("mail_on_rails", [
  homeModule.name,
  registerModule.name,
  'angularPartials',
  uiRouter,
])
.config(angularRoutes)
.constant('angularConfig', angularConfig);
