(function() {
    "use strict";

    var homeNavgiationDirective = function() {
        return {
            controller: HomeNavigationController,
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/home/components/navigation/navigation.html',
            link: function(scope, elem, attrs) {}
        };
    };

    var HomeNavigationController = function($scope) {

    };

    module.exports = homeNavgiationDirective;
}());