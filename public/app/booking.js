/**
 * Created by lequan on 10/20/2016.
 */

var bookingModule = angular.module('app.booking', []);

bookingModule.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/booking', {
        templateUrl: 'find.html',
        controller: 'BookingController'
    });
}]);

app.controller('BookingController', function ($scope, Booking, FlightService){

    $scope.flights =FlightService.getFlights();

    $scope.reserve = function (booking) {
          Booking.save(booking, function () {

          });
    };

});