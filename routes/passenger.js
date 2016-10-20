/**
 * Created by lequan on 10/20/2016.
 */

var Passenger = require('../models/passenger')
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    var passenger = new Passenger();
    passenger = req.body;

    passenger.save(function (err, docs) {
        if (err)
            res.send(err);
        res.json(
            {
                message: "Đã lấy vé thành công."
            }
        );
    });
});






module.exports = router;