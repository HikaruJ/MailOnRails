(function() {
    "use strict";

    //Components
    var loginOptions = require('./components/login/login.component');
    var passwordInputOptions = require('./components/register/password/password.component');
    var registerOptions = require('./components/register/register.component');

    //Directives
    var homeDirective = require("./components/home.directive");
    var contentDirective = require('./components/content/content.directive');
    var headerDirective = require('./components/content/header/header.directive');
    var footerDirective = require('./components/footer/footer.directive');
    var navigationDirective = require('./components/navigation/navigation.directive');

    //Factories
    var loginService = require('./components/login/login.factory');
    var registerService = require('./components/register/register.factory');

    //Services
    var angularLoading = require('angular-loading');

    module.exports = angular.module('home', [
            angularLoading.name
        ])
        .component('login', loginOptions)
        .component('passwordInput', passwordInputOptions)
        .component('register', registerOptions)
        .directive('home', homeDirective)
        .directive('homeContent', contentDirective)
        .directive('homeFooter', footerDirective)
        .directive('homeHeader', headerDirective)
        .directive('homeNavigation', navigationDirective)
        .factory('loginService', loginService)
        .factory('registerService', registerService);
}());