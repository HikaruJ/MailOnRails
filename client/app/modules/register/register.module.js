var angular = require('angular');

var registerDirective = require("./register.directive");

module.exports = angular.module('register', [])
  .directive('register', registerDirective);
