(function() {
    "use strict";

    //  Modules
    var registerModule = require('../register/register.module');

    //  Directives
    var homeDirective = require("./components/home.directive");
    var contentDirective = require('./components/content/content.directive');
    var headerDirective = require('./components/content/header/header.directive');
    var footerDirective = require('./components/footer/footer.directive');
    var navigationDirective = require('./components/navigation/navigation.directive');

    module.exports = angular.module('home', [])
        .directive('home', homeDirective)
        .directive('homeContent', contentDirective)
        .directive('homeFooter', footerDirective)
        .directive('homeHeader', headerDirective)
        .directive('homeNavigation', navigationDirective);
}());