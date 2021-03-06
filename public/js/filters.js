'use strict';

/* Filters */

define(['angular'],function(angular){
    return angular.module('phonecatFilters', []).filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });
});

