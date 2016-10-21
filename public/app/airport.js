/**
 * Created by lequan on 10/20/2016.
 */

app.controller('AirportController', function ($scope, Airport) {

    //$scope.airport = new Airport();

    $scope.getAirports = function () {
        $scope.airports = Airport.query(function (data) {
            var a =data;
        });
    };

    var reload = function () {
        $scope.airports = Airport.query(function (data) {
            var a =data;
        });

        $scope.airport = {};
    };

    reload();
});