(function() {
    "use strict";

    var passwordInputComponent = {
        controller: PasswordInputController,
        bindings: {
            isValid: '=',
            password: '=',
        },
        templateUrl: '/partials/home/components/register/password/password.view.html',
    };

    function PasswordInputController($scope) {
        var ctrl = this;

        ctrl.viewModel = {
            max: 4,
            text: '',
            type: '',
            value: 0
        };

        ctrl.checkPassword = function(password) {
            var isPasswordDefined = false;

            ctrl.isValid = false;

            if (password !== undefined) {
                isPasswordDefined = true;
            } else {
                ctrl.viewModel.text = '';
                ctrl.viewModel.type = '';
                ctrl.viewModel.value = 0;
            }

            if (isPasswordDefined) {
                var result = zxcvbn(password);
                if (result !== null) {
                    ctrl.viewModel.value = result.score;
                    switch (result.score) {
                        case 0:
                            ctrl.viewModel.text = 'Simple';
                            break;

                        case 1:
                            ctrl.viewModel.text = 'Weak';
                            ctrl.viewModel.type = 'danger';
                            break;

                        case 2:
                            ctrl.viewModel.text = 'Moderate';
                            ctrl.viewModel.type = 'warning';
                            break;

                        case 3:
                            ctrl.isValid = true;
                            ctrl.viewModel.text = 'Strong';
                            ctrl.viewModel.type = 'warning';
                            break;

                        case 4:
                            ctrl.isValid = true;
                            ctrl.viewModel.text = 'Perfect';
                            ctrl.viewModel.type = 'success';
                            break;
                    }
                }
            }

        };
    }

    module.exports = passwordInputComponent;
}());