/**
 * Created by lequan on 10/20/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    bookingId: String,
    date: Date,
    cost: Number,
    status: Boolean,
    flights: [
        {
            flightId: String,
            date: Date,
            class: String,
            grade: String,
            cost: Number
        }
    ],
    passengers: [
        {
            adult: Number,
            children: Number,
            baby: Number
        }
    ]
});

module.exports = mongoose.model('Booking', BookingSchema);