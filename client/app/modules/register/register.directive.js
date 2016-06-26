(function() {
    "use strict";

    var registerDirective = function() {
        return {
            bindToController: true,
            controller: RegisterController,
            controllerAs: 'register',
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/register/register.view.html',
            link: function(scope, elem, attrs) {}
        };
    };

    var RegisterController = function($scope, registerService) {
        var register = this;

        register.viewModel = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordScore: 0,
            passwordConfirm: '',
            passwordConfirmScore: 0
        };

        register.submit = function() {
            var user = register.viewModel;
            registerService.registerUser(user);
        };
    };

    module.exports = registerDirective;
}());