(function() {
    "use strict";

    var composeComponent = {
        controller: ComposeController,
        bindings: {},
        templateUrl: '/partials/mail/components/compose/compose.view.html'
    };

    function ComposeController($scope, mailService) {
        var ctrl = this;

        ctrl.viewModel = {
            body: '',
            recipient: '',
            subject: '',
            user: {
                email: 'test@mailonrails.com'
            }
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
            debugger;
            var body = ctrl.viewModel.body;
            var from = ctrl.viewModel.from;
            var subject = ctrl.viewModel.subject;
            var to = ctrl.viewModel.recipient;

            mailService.send(body, from, subject, to)
                .then(function(response) {
                    debugger;
                });
        };
    }

    module.exports = composeComponent;
}());