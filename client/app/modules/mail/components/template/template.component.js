(function() {
    "use strict";

    var templateComponent = {
        bindings: {},
        controller: TemplateController,
        templateUrl: '/partials/mail/components/template/template.view.html'
    };

    function TemplateController($scope) {
        var ctrl = this;
    }

    module.exports = templateComponent;
}());