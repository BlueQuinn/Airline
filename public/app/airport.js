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

    $scope.add = function (airport) {
        //var airport = {airportId: $scope.airportId, name: $scope.name};
        Airport.save(airport, function () {
            console.log(airport);
            reload();
        });
    };

});