var angular = require('angular');
var homeDirective = require("./home.directive");

module.exports = angular.module('home', [])
  .directive('homePage', homeDirective);
