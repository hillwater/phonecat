'use strict';

/* App Module */

define(['angular','angular-gestures','angular-route','animations','controllers','filters','services'],function(angular){
    return angular.module('phonecatApp', [
        'angular-gestures',
        'ngRoute',
        'phonecatAnimations',
        'phonecatControllers',
        'phonecatFilters',
        'phonecatServices'
    ]).config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/phones', {
                    templateUrl: '/partials/phone-list',
                    controller: 'PhoneListCtrl'
                }).
                when('/phones/:phoneId', {
                    templateUrl: '/partials/phone-detail',
                    controller: 'PhoneDetailCtrl'
                }).
                when('/phones/preview/:phoneId/:imgIdx', {
                    templateUrl: '/partials/phone-preview',
                    controller: 'PhonePreviewCtrl'
                }).
                otherwise({
                    redirectTo: '/phones'
                });
        }]);
});


