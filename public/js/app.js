'use strict';

/* App Module */

define(['angular','angular-route','animations','controllers','filters','services'],function(angular){
    return angular.module('phonecatApp', [
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
                otherwise({
                    redirectTo: '/phones'
                });
        }]);
});


