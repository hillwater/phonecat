'use strict';

require.config({
    paths: {
        'jquery': '../lib/jquery/jquery',
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular-animate/angular-animate',
        'angular-resource': '../lib/angular-resource/angular-resource',
        'angular-route': '../lib/angular-route/angular-route',
        'angular-mocks': '../lib/angular-mocks/angular-mocks'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'angular-animate': ['angular'],
        'angular-resource': ['angular'],
        'angular-route': ['angular'],
        'angular-mocks': {
            deps:['angular'],
            'exports':'angular-mocks'
        }
    }
});

// Start the main app logic.
//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'angular',
    'app'
], function(angular, app) {
    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});