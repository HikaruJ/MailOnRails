(function() {
    "use strict";

    var homeHeaderDirective = function() {
        return {
            controller: HomeHeaderController,
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/home/components/content/header/header.html',
            link: function(scope, elem, attrs) {}
        };
    };

    var HomeHeaderController = function($scope) {

    };

    module.exports = homeHeaderDirective;
}());