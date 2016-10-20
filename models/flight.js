/**
 * Created by lequan on 10/20/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
    flightId: String,
    departure: String,
    arrival: String,
    date: Date,
    time: String,
    price: [
        {
            class: String,
            grade: String,
            seat_count: Number,
            cost: Number
        }
    ]
});

module.exports = mongoose.model('Flight', FlightSchema);