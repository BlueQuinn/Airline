/**
 * Created by lequan on 10/20/2016.
 */

var router = require('express').Router();
var ObjectID = require('mongodb').ObjectID;
var Airport = require('../models/airport');

router.get('/', function (req, res) {
   Airport.find({}, function (err, docs) {
       if (err)
           res.send(err);
       res.json(docs);
   });
});

router.post('/', function (req, res) {


    var airport = new Airport();
    airport.airportId = req.body.airportId;
    airport.name = req.body.name;

    airport.save(function (err, docs) {
        if (err)
            res.send(err);
        res.json(
            {
                message: "Thêm sân bay thành công"
            }
        );
    });
});

module.exports = router;