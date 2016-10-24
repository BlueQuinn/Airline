/**
 * Created by lequan on 10/20/2016.
 */

app.controller('FlightController', function ($scope, $location, $route, Airport, Flight, FlightService) {

    $scope.airports = [];
    $scope.arrivals = [];
    $scope.adult = [1, 2, 3, 4, 5, 6];
    $scope.children = [];
    $scope.baby = [];
    $scope.isReturn = 'oneway';
    $scope.seatCount = 0;
    var adultCount = 1, childrenCount = 0, babyCount = 0;

    var reload = function () {
        Airport.query(function (data) {
            $scope.airports = data;
        });
    };

    reload();


    $scope.searchFlights = function () {

        if ($scope.departureId === undefined) {
            alert('Bạn chưa chọn địa điểm đi');
            return;
        }
        if ($scope.arrivalId === undefined) {
            alert('Bạn chưa chọn địa điểm đến');
            return;
        }
        if ($scope.departureDate === undefined) {
            alert('Bạn chưa chọn ngày khởi hành');
            return;
        }
        if ($scope.returnDate === undefined) {
            alert('Bạn chưa chọn ngày trở về');
            return;
        }

        if ($scope.isReturn == 'oneway') {
            $scope.returnDate = 0;
        }

        $scope.seatCount = adultCount + childrenCount;

        Flight.query(
            /*{
             departure: $scope.departureId,
             arrival: $scope.arrivalId,
             date: $scope.departureDate,
             return_date: $scope.returnDate,
             seat_count: $scope.seatCount
             },*/ function (data) {
                if (data.length < 1) {
                    alert('Không tìm thấy chuyến bay nào');
                    return;
                }

                var flights = {
                    adult: adultCount,
                    children: childrenCount,
                    baby: babyCount
                };
                flights.departure = parseData(data[0]);
                if (data.length > 1) {
                    flights.return = parseData(data[1]);
                }

                FlightService.setFlights(flights);
                $location.path('/booking');
            });
    };

    $('#departure').change(function () {
        $scope.departureId = $("#departure").val();
        Flight.query({departure: $scope.departureId}, function (data) {
            $scope.arrivals = [];
            data.forEach(function (flight) {
                $scope.airports.forEach(function (airport) {
                    if (flight.arrival == airport.airportId) {
                        $scope.arrivals.push(airport);
                    }
                })
            });
        });
    });

    $('#arrival').change(function () {
        $scope.arrivalId = $("#arrival").val();
    });

    $('#adult').change(function () {
        $scope.children = [];
        $scope.baby = [];
        adultCount = $("#adult").val();
        for (var i = 0; i <= adultCount; ++i) {
            $scope.children.push(i);
            $scope.baby.push(i);
        }
        $scope.$apply();
    });

    $('#children').change(function () {
        $scope.baby = [];
        childrenCount = $("#children").val();
        babyCount = adultCount - childrenCount;
        for (var i = 0; i <= babyCount; ++i) {
            $scope.baby.push(i);
        }
        $scope.$apply();
    });

    $('#baby').change(function () {
        $scope.children = [];
        babyCount = $("#baby").val();
        childrenCount = adultCount - babyCount;
        for (var i = 0; i <= childrenCount; ++i) {
            $scope.children.push(i);
        }
        $scope.$apply();
    });

    $('input[id="departure_date_picker"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        },
        function (start, end, label) {
            $scope.departureDate = (new Date(start)).getTime();
            $scope.returnDate = 0;
        });

    $('input[id="return_date_picker"]').daterangepicker({
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        },
        function (start, end, label) {
            $scope.departureDate = (new Date(start)).getTime();
            $scope.returnDate = (new Date(end)).getTime();
        });
});

function parseData(data) {

    var flights = [];

    //data.forEach(function (flight) {
    for (var flight in data) {
        if (data.hasOwnProperty(flight)) {
            flight = data[flight];
            flight.info.forEach(function (info) {
            var item = {};
                item.flightId = flight.flightId;
                item.departure = flight.departure;
                item.arrival = flight.arrival;
                item.date = flight.date;
                item.time = flight.time;
                item.total_seat = info.total_seat;
                item.cost = info.cost;

                switch (info.class) {
                    case 'C':
                        item.class = 'Thương gia';
                        break;
                    case 'Y':
                        item.class = 'Phổ thông';
                        break;
                }

                switch (info.price) {
                    case 'F':
                        item.price = 'Linh hoạt';
                        break;
                    case 'S':
                        item.price = 'Tiêu chuẩn';
                        break;
                    case 'C':
                        item.price = 'Tiết kiệm';
                        break;
                }


                flights.push(item);
            });
        }
    }
    return flights;
}