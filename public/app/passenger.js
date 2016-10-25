/**
 * Created by lequan on 10/20/2016.
 */

app.controller('PassengerController', function ($scope, Passenger, TicketService) {

    $scope.info = ['Người lớn', 'Trẻ em (dưới 18)', 'Trẻ sơ sinh'];
    $scope.id = ['Số CMND', 'Số giấy khai sinh', 'Số giấy khai sinh'];


    $scope.cost = TicketService.getCost();

    $scope.passengers = [[], [], []];
    var passengers = TicketService.getPassenger();
    for (var i = 0; i < passengers.adult; ++i)
        $scope.passengers[0].push({});
    for (var i = 0; i < passengers.children; ++i)
        $scope.passengers[1].push({});
    for (var i = 0; i < passengers.baby; ++i)
        $scope.passengers[2].push({});

    $scope.show = [true, passengers.children > 0, passengers.baby > 0];

    $scope.getTicket = function () {

        var ticket = {
            bookingId: TicketService.getBookingId(),
            phone: $scope.phone,
            email: $scope.email,
            adult: $scope.passengers[0],
            children: $scope.passengers[1],
            baby: $scope.passengers[2]
        };

        Passenger.save(ticket, function (data) {
            alert(data.message);
        });
    };

    $('input[class="birthday_picker"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        },
        function (start, end, label) {
        });

});