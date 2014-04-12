'use strict';

/* jasmine specs for controllers go here */

define(['angular','angular-mocks','app','controllers'],function(angular){
    describe('PhoneCat controllers', function() {

        beforeEach(function(){
            this.addMatchers({
                toEqualData: function(expected) {
                    return angular.equals(this.actual, expected);
                }
            });
        });

        beforeEach(module('phonecatApp'));
        beforeEach(module('phonecatServices'));

        describe('PhoneListCtrl', function(){
            var scope, ctrl, $httpBackend;

            beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('phones/phones.json').
                    respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

                scope = $rootScope.$new();
                ctrl = $controller('PhoneListCtrl', {$scope: scope});
            }));


            it('should create "phones" model with 2 phones fetched from xhr', function() {
                expect(scope.phones).toEqualData([]);
                $httpBackend.flush();

                expect(scope.phones).toEqualData(
                    [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
            });


            it('should set the default value of orderProp model', function() {
                expect(scope.orderProp).toBe('age');
            });
        });


        describe('PhoneDetailCtrl', function(){
            var scope, $httpBackend, ctrl,
                xyzPhoneData = function() {
                    return {
                        name: 'phone xyz',
                        images: ['image/url1.png', 'image/url2.png']
                    };
                };


            beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

                $routeParams.phoneId = 'xyz';
                scope = $rootScope.$new();
                ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
            }));


            it('should fetch phone detail', function() {
                expect(scope.phone).toEqualData({});
                $httpBackend.flush();

                expect(scope.phone).toEqualData(xyzPhoneData());
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });

            it('should set phone image', function() {
                scope.setImage('image_url');
                expect(scope.mainImageUrl).toEqualData('image_url');
            });
        });

        describe('PhonePreviewCtrl', function(){
            var scope, $httpBackend, $routeParams,ctrl,
                xyzPhoneData = function() {
                    return {
                        name: 'phone xyz',
                        images: ['image/url1.png', 'image/url2.png']
                    };
                };

            var mockEvent = {
                target: angular.element('<div>hello</div>'),
                gesture: {
                    scale:1,
                    deltaX:1,
                    deltaY:1,
                    preventDefault:function(){}
                }
            };


            beforeEach(inject(function(_$httpBackend_, $rootScope, _$routeParams_, $controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

                $routeParams = _$routeParams_;
                $routeParams.phoneId = 'xyz';
                scope = $rootScope.$new();
                ctrl = $controller('PhonePreviewCtrl', {$scope: scope});
            }));


            it('should fetch phone detail', function() {
                $routeParams.imgIdx = 0;
                expect(scope.phone).toEqualData({});
                $httpBackend.flush();

                expect(scope.phone).toEqualData(xyzPhoneData());
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });

            it('should change phone image', function() {
                $routeParams.imgIdx = 1;
                expect(scope.phone).toEqualData({});
                $httpBackend.flush();

                expect(scope.phone).toEqualData(xyzPhoneData());
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[1]);
            });

            it('should go to previous image', function() {
                $routeParams.imgIdx = 1;
                $httpBackend.flush();

                scope.prevSlide();
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });

            it('should go to next image', function() {
                $routeParams.imgIdx = 0;
                $httpBackend.flush();

                scope.nextSlide();
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[1]);
            });

            it('should go with circle order', function() {
                $routeParams.imgIdx = 0;
                $httpBackend.flush();

                scope.prevSlide();
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[1]);

                scope.nextSlide();
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });

            it('should on the same image when do pinch', function() {
                $routeParams.imgIdx = 0;
                $httpBackend.flush();

                scope.pinch(mockEvent);
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });

            it('should on the same image when do drag', function() {
                $routeParams.imgIdx = 0;
                $httpBackend.flush();

                scope.drag(mockEvent);
                expect(scope.mainImageUrl).toEqualData(xyzPhoneData().images[0]);
            });
        });
    });
});

