(function() {
    "use strict";

    var angular = require('angular');

    var mailComponent = require('./mail.component');
    var inboxComponent = require('./components/inbox/inbox.component');
    var messageComponent = require('./components/message/message.component');
    var sidebarComponent = require('./components/sidebar/sidebar.component');
    var topbarComponent = require('./components/topbar/topbar.component');

    module.exports = angular.module('inbox', [])
        .component('mail', mailComponent)
        .component('mailInbox', inboxComponent)
        .component('mailMessage', messageComponent)
        .component('mailSidebar', sidebarComponent)
        .component('mailTopbar', topbarComponent);
}());