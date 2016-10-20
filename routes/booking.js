/**
 * Created by lequan on 10/20/2016.
 */

var Hashids = require('hashids');
var express = require('express');
var Booking = require('../models/booking')
var router = express.Router();
var hashids = new Hashids();

router.post('/', function (req, res) {

    Booking.count({}, function (err, count) {
        if (err)
            res.send(err);

        var docs = new Booking();     // in seconds
        docs._id = new ObjectId(hashids.encode(count));
        docs.date = new Date().getTime() * 1000;
        docs.status = false;
        docs.flights = req.flights;
        docs.passengers = req.passengers;

        var cost = 0;
        for (var i = 0; i < docs.flights.length; ++i)
            cost += docs.flights[i].cost;
        var passenger_count = passengers.adult + passengers.children;

        docs.cost = cost * passenger_count;

        Booking.save(function (err, docs) {
            if (err)
                res.send(err);

            res.json(
                {
                    message: 'Đặt chỗ thành công. Hệ thống sẽ giữ chỗ cho bạn trong vòng 24 tiếng. Trong thời gian này bạn hãy nhanh chóng điền thông tin hành khách để lấy vé'

                }
            );
        });



    });
});
