var angular = require('angular');

var registerDirective = require('./register.directive');
var registerService = require('./register.factory');

module.exports = angular.module('register', [])
  .directive('register', registerDirective)
  .factory('registerService', registerService);
