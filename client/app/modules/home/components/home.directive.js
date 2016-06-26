(function() {
    "use strict";

    var homeDirective = function() {
        return {
            controller: HomeController,
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/home/components/home.html',
            link: function(scope, elem, attrs) {}
        };
    };

    var HomeController = function($scope) {

    };

    module.exports = homeDirective;
}());