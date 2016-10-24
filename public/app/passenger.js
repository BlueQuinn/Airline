/**
 * Created by lequan on 10/20/2016.
 */

app.controller('PassengerController', function ($scope, Passenger) {

    $scope.buyTicket = function (ticket) {

        Passenger.save(ticket, function () {

        });

    };
    $('input[id="birthday"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        },
        function (start, end, label) {
        });

    $('input[id="date-id"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        },
        function (start, end, label) {
        });
});