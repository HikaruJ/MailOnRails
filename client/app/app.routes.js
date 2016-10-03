(function() {
    "use strict";

    var appRoutes = function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                template: '<home></home>',
                abstract: true
            })

        .state('home.index', {
            template: '<home-content></home-content>',
            url: '/'
        })

        .state('home.login', {
            template: '<login></login>',
            url: '/login'
        })

        .state('home.register', {
            template: '<register></register>',
            url: '/register'
        })

        .state('mail', {
            template: '<mail></mail>',
            abstract: true
        })

        .state('mail.compose', {
            template: '<mail-compose></mail-compose>',
            url: '/compose'
        })

        .state('mail.inbox', {
            template: '<mail-template></mail-template>',
            abstract: true
        })

        .state('mail.inbox.index', {
            template: '<mail-inbox></mail-inbox>',
            url: '/inbox',
            params: {
                user: null
            }
        })

        .state('mail.inbox.message', {
            template: '<mail-message></mail-message>',
            url: '/inbox/:displayId',
            params: {
                message: null,
                returnRoute: null,
                user: null
            }
        })

        .state('mail.sent', {
            template: '<mail-template></mail-template>',
            abstract: true
        })

        .state('mail.sent.index', {
            template: '<mail-sent></mail-sent>',
            url: '/sent',
            params: {
                user: null
            }
        })

        .state('mail.sent.message', {
            template: '<mail-message></mail-message>',
            url: '/sent/:displayId',
            params: {
                message: null,
                returnRoute: null,
                user: null
            }
        })

        .state('mail.trash', {
            template: '<mail-template></mail-template>',
            abstract: true
        })

        .state('mail.trash.index', {
            template: '<mail-trash></mail-trash>',
            url: '/trash',
            params: {
                user: null
            }
        })

        .state('mail.trash.message', {
            template: '<mail-message></mail-message>',
            url: '/trash/:displayId',
            params: {
                message: null,
                returnRoute: null,
                user: null
            }
        });

        $urlRouterProvider.otherwise('/');
    };

    module.exports = appRoutes;
}());