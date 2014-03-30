'use strict';

/* Controllers */

define(['angular','angular-route','services'],function(angular){
    return angular.module('phonecatControllers', []).controller('PhoneListCtrl', ['$scope', 'Phone',
            function($scope, Phone) {
                $scope.phones = Phone.query();
                $scope.orderProp = 'age';
            }]).controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
            function($scope, $routeParams, Phone) {
                $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
                    $scope.mainImageUrl = phone.images[0];
                });

                $scope.setImage = function(imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                }
            }]);
});

