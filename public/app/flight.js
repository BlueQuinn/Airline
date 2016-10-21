/**
 * Created by lequan on 10/20/2016.
 */

app.controller('FlightController', function ($scope, Flight) {

    var reload = function () {
        Flight.query(function () {
            $scope.flights = [];
            for (var flight in data) {
                var item = {};
                item.flightId = flight.flightId;
                item.departure = flight.departure;
                item.arrival = flight.arrival;
                item.date = flight.date;
                item.time = flight.time;

                for (var info in flight.info) {
                    item.class = info.class;
                    item.price = info.price;
                    item.total_seat = info.total_seat;
                    item.available_seat = info.available_seat;
                    item.cost = info.cost;

                    $scope.flights.push(item);
                }
            }
        });

        $scope.flight = {};
        $scope.flight.info = {};
    };

    reload();

    $scope.add = function (flight) {
        flight.date = (new Date()).getTime();
        Flight.save(flight, function () {
            console.log(flight);
            reload();
        });
    };


    $scope.getArrival = function () {
        $scope.departureId = 'HAN';
        Flight.query({departure: $scope.departureId}, function (data) {
            $scope.arrival = [];
            for (var i in data)
                $scope.arrival.push(i);
        });
    };


    $scope.searchFlights = function (flight) {

        Flight.query(
            {
                departure: flight.departure,
                arrival: flight.arrival,
                date: flight.date,
                return_date: flight.return_date,
                seat_count: flight.seat_count
            }, function (flights) {

            });
    };


    $scope.book = function (flight) {
        Flight.save(flight, function () {

        });
    };

});
