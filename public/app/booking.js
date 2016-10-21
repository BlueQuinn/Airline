/**
 * Created by lequan on 10/20/2016.
 */

app.controller('BookingController', function ($scope, Booking){

    $scope.reserve = function (booking) {
          Booking.save(booking, function () {

          });
    };

});