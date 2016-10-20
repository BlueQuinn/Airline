/**
 * Created by lequan on 10/20/2016.
 */

var express = require('express');
var router = express.Router();
var FlightCode = require('../models/flight_code');

router.get('/airports', function (req, res) {
   FlightCode.find({}, function (err, docs) {
       if (err)
           res.send(err);
       res.json(docs);
   });
});