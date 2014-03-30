'use strict';

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/public/js',

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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});