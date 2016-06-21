var angular = require('angular');
var homeDirective = require("./components/home.directive");

var contentDirective = require('./components/content/content.directive');
var footerDirective = require('./components/footer/footer.directive');
var headerDirective = require('./components/header/header.directive');
var navigationDirective = require('./components/navigation/navigation.directive');

module.exports = angular.module('home', [])
  .directive('home', homeDirective)
  .directive('homeContent', contentDirective)
  .directive('homeFooter', footerDirective)
  .directive('homeHeader', headerDirective)
  .directive('homeNavigation', navigationDirective);
