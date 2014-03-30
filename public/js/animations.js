'use strict';

/* Animations */

define(['angular', 'jquery', 'angular-animate'],function(angular, $){
    return angular.module('phonecatAnimations', ['ngAnimate']).animation('.phone', function() {

        var animateUp = function(element, className, done) {
            if(className !== 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                top: 500,
                left: 0,
                display: 'block'
            });

            $(element).animate({
                top: 0
            }, done);

            return function(cancel) {
                if(cancel && element.stop) {
                    element.stop();
                }
            };
        };

        var animateDown = function(element, className, done) {
            if(className !== 'active') {
                return;
            }
            element.css({
                position: 'absolute',
                left: 0,
                top: 0
            });

            $(element).animate({
                top: -500
            }, done);

            return function(cancel) {
                if(cancel && element.stop) {
                    element.stop();
                }
            };
        };

        return {
            addClass: animateUp,
            removeClass: animateDown
        };
    });
});
