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
                };
            }]).controller('PhonePreviewCtrl', ['$scope', '$routeParams', 'Phone',
            function($scope, $routeParams, Phone) {
                $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
                    $scope.mainImageUrl = phone.images[$routeParams.imgIdx];
                });

                $scope.prevSlide = function () {
                    var idx = $scope.phone.images.indexOf($scope.mainImageUrl);
                    if(idx <= 0){
                        idx = $scope.phone.images.length;
                    }
                    $scope.mainImageUrl = $scope.phone.images[idx - 1];
                };

                $scope.nextSlide = function () {
                    var idx = $scope.phone.images.indexOf($scope.mainImageUrl);
                    if(idx >=  $scope.phone.images.length - 1){
                        idx = -1;
                    }
                    $scope.mainImageUrl = $scope.phone.images[idx + 1];
                };

                $scope.pinch = function(event) {
                    var ele = event.target;
                    $(ele).css({transform:'scale(' + event.gesture.scale + ')'});
                    $(ele).css({
                        '-moz-transform': 'scale(' + event.gesture.scale + ')',
                        '-webkit-transform': 'scale(' + event.gesture.scale + ')'
                    });
                    event.gesture.preventDefault();
                };

                $scope.drag = function(event) {
                    var ele = event.target;
                    $(ele).css({transform:"translate3d("+event.gesture.deltaX+"px,"+event.gesture.deltaY+"px,"+0+"px)"});
                    event.gesture.preventDefault();
                };
            }]);
});

