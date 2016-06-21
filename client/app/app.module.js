'use strict';

var angular = require('angular');
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
.config([
  "$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state("main", {
      template: "<home-page></home-page>",
      url: "/main"
    });
    return $urlRouterProvider.otherwise("/");
  }
]);
