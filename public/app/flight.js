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

    /*$scope.getArrival = function () {
     var departureId = $("#departure").val();
     Flight.query({departure: departureId}, function (data) {
     $scope.arrivals = data;
     });
     $scope.$apply();
     };*/

    /* $('input[type=radio][name=optradio]').change(function () {
     if ()
     });*/

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

        $scope.seatCount = adultCount + childrenCount + babyCount;

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

                var flights = [];
                data.forEach(function (flight) {
                    var item = {};
                    item.flightId = flight.flightId;
                    item.departure = flight.departure;
                    item.arrival = flight.arrival;
                    item.date = (new Date(parseInt(flight.date))).toDateString();
                    item.time = flight.time;

                    flight.info.forEach(function (info) {
                        switch (info.class)
                        {
                            case 'C':
                                item.class = 'Thương gia';
                                break;
                            case 'Y':
                                item.class = 'Phổ thông';
                                break;
                        }
                        switch (info.price)
                        {
                            case 'A':
                                item.price = 'Linh hoạt';
                                break;
                            case 'B':
                                item.price = 'Tiêu chuẩn';
                                break;
                            case 'C':
                                item.price = 'Tiết kiệm';
                                break;
                        }
                        item.total_seat = info.total_seat;
                        item.cost = info.cost;

                        flights.push(item);
                    });
                });


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
