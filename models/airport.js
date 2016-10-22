/**
 * Created by lequan on 10/20/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AirportSchema = new Schema({
    country: String,
    airportId: String,
    name: String
});

module.exports = mongoose.model('Airport', AirportSchema);