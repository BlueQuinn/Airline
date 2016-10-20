/**
 * Created by lequan on 10/20/2016.
 */

var express = require('express');
var router = express.Router();
var FlightCode = require('../models/flight');

router.get('/:departure', function (req, res) {
    FlightCode.find({departure: req.departure}, function (err, docs) {
        if (err)
            res.send(err);
        res.json(docs);
    });
});

