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
            template: '<mail-inbox></mail-inbox>',
            url: '/inbox',
            params: {
                user: null
            }
        })

        .state('mail.message', {
            template: '<mail-message></mail-message>',
            url: '/inbox/:displayId',
            params: {
                message: null,
                user: null
            }
        });

        $urlRouterProvider.otherwise('/');
    };

    module.exports = appRoutes;
}());