(function() {
    "use strict";

    var composeComponent = {
        controller: ComposeController,
        bindings: {},
        templateUrl: '/partials/mail/components/compose/compose.view.html'
    };

    function ComposeController($scope, $state, composeService, localStorageService, modalService) {
        var ctrl = this;

        ctrl.viewModel = {
            body: '',
            disableInput: false,
            recipient: '',
            subject: '',
            user: localStorageService.get('user')
        };

        ctrl.viewModel.summernoteOptions = {
            airMode: false,
            focus: false,
            height: 400,
            maxHeight: 400,
            minHeight: 200,
            toolbar: [
                ['edit', ['undo', 'redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['ltr', 'rtl']],
                ['insert', ['link', 'picture', 'video', 'hr']],
            ]
        };

        ctrl.submit = function() {
            ctrl.viewModel.disableInput = true;

            var body = ctrl.viewModel.body;
            var from = ctrl.viewModel.user.email;
            var subject = ctrl.viewModel.subject;
            var to = ctrl.viewModel.recipient;

            composeService.send(body, from, subject, to)
                .then(function(response) {
                    if (response.status == 200) {
                        modalService.info(response.data.response, 'md');
                        ctrl.viewModel.disableInput = false;

                        $state.go('mail.sent.index', {
                            user: ctrl.viewModel.user
                        });
                    }
                })
                .catch(function(error) {
                    ctrl.viewModel.disableInput = false;
                });
        };
    }

    module.exports = composeComponent;
}());