/**
 * Created by lequan on 10/20/2016.
 */

app.controller('PassengerController', function ($scope, Passenger) {

    $scope.buyTicket = function (ticket) {

        Passenger.save(ticket, function () {

        });

    };

});