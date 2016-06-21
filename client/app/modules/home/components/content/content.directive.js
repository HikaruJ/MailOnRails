'use strict';

var homeContentDirective = function() {
  return {
    controller: HomeContentController,
    restrict: 'E',
    scope: {},
    templateUrl: '/partials/home/components/content/content.html',
    link: function(scope, elem, attrs) {
    }
  }
};

var HomeContentController = function($scope) {
};

module.exports = homeContentDirective;
