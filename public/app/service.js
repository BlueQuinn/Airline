/**
 * Created by lequan on 10/23/2016.
 */

app.service('FlightService', function () {

    var availableFlights = [];

    var setFlights = function(flights){
        availableFlights = flights;
    };

    var getFlights = function () {
        return availableFlights;
    };

    return{
        setFlights: setFlights,
        getFlights: getFlights
    };

});
