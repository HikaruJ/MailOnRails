(function() {
    "use strict";

    var loginComponent = {
        controller: LoginController,
        bindings: {},
        templateUrl: '/partials/home/components/login/login.view.html'
    };

    function LoginController($loading, $scope, $state, loginService, modalService) {
        var ctrl = this;

        ctrl.viewModel = {
            disableInput: false,
            password: '',
            username: ''
        };

        ctrl.submit = function() {
            $loading.start('progress');
            ctrl.viewModel.disableInput = true;

            loginService.loginUser(ctrl.viewModel.password, ctrl.viewModel.username)
                .then(function(data) {
                    if (data.status == 200) {
                        loginService.getUser(ctrl.viewModel.username)
                            .then(function(data) {
                                if (data.status == 200) {
                                    $state.go('mail.inbox.index', {
                                        user: data.response
                                    });
                                } else {
                                    modalService.alert(data, 'md');
                                }

                                $loading.finish('progress');
                                ctrl.viewModel.disableInput = false;
                            });
                    } else if (data.status == 401) {
                        modalService.alert('User name or password are incorrect. Please try again', 'md');
                    } else {
                        modalService.alert(data, 'md');
                    }

                    $loading.finish('progress');
                    ctrl.viewModel.disableInput = false;
                });
        };
    }

    module.exports = loginComponent;
}());