'use strict';

var homeFooterDirective = function() {
  return {
    controller: HomeFooterController,
    restrict: 'E',
    scope: {},
    templateUrl: '/partials/home/components/footer/footer.html',
    link: function(scope, elem, attrs) {
    }
  }
};

var HomeFooterController = function($scope) {

};

module.exports = homeFooterDirective;
