/**
 * Created by lequan on 10/20/2016.
 */

app.controller('BookingController', function ($scope, Booking, FlightService) {

    $scope.flights = FlightService.getFlights();
    $scope.departureFlight = -1;
    $scope.returnFlight = -2;
    //$scope.departureFlight = -1;
    if ($scope.flights.return !== undefined) {
        $scope.returnFlight = -1;
    }

    $scope.reserve = function () {
        if ($scope.departureFlight == -1) {
            alert('Bạn chưa chọn chuyến bay khởi hành');
            return;
        }
        if ($scope.returnFlight == -1) {
            alert('Bạn chưa chọn chuyến bay khứ hồi');
            return;
        }

        var departureFlight = $scope.flights.departure[$scope.departureFlight];
        var booking = {
            cost: $scope.departure.total_cost,
            passenger: {
                adult: $scope.flights.adult,
                children: $scope.flights.children,
                baby: $scope.flights.baby
            },
            flight: [
                {
                    flightId: departureFlight.flightId,
                    date: (new Date(departureFlight.date)).getTime(),
                    class: departureFlight.class,
                    price: departureFlight.price
                }
            ]
        };
        if ($scope.returnFlight > 0) {
            var returnFlight = $scope.flights.return[$scope.returnFlight];
            booking.flight.push({
                returnFlight: {
                    flightId: returnFlight.flightId,
                    date: (new Date(returnFlight.date)).getTime(),
                    class: returnFlight.class,
                    price: returnFlight.price
                }
            });
            booking.cost += $scope.return.total_cost;
        }

        Booking.save(booking, function () {


        });
    };


    $scope.updateDeparture = function (flights) {
        var flight = flights[$scope.departureFlight];
        $scope.departure = updateTicket(flight);
    };

    $scope.updateReturn = function (flights) {
        var flight = flights[$scope.returnFlight];
        $scope.return = updateTicket(flight);
    };

    function updateTicket(flight) {
        var ticket = {};

        ticket.flightId = flight.flightId;
        ticket.departure = flight.departure;
        ticket.arrival = flight.arrival;
        ticket.date = flight.date;
        ticket.time = flight.time;
        ticket.class = flight.class;
        ticket.price = flight.price;

        ticket.total_passenger = $scope.flights.adult + $scope.flights.children + $scope.flights.baby;
        ticket.adult_cost = flight.cost;
        ticket.children_cost = flight.cost * 0.8;
        ticket.baby_cost = flight.cost / 10;

        ticket.cost = ticket.cost * $scope.flights.adult
            + ticket.children_cost * $scope.flights.children
            + ticket.baby_cost * $scope.flights.baby;

        ticket.total_cost = ticket.cost * 1.1;
        return ticket;
    }

});