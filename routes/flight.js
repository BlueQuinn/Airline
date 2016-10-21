/**
 * Created by lequan on 10/20/2016.
 */

var Flight = require('../models/flight');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    switch (filterQuery(req.query))
    {
        case SEARCH_FLIGHTS: {
            var flights = [];
            var query = {
                departure: req.query.departure,
                arrival: req.query.arrival,
                date: req.query.date,
                'info.available_seat': req.query.seat_count
            };

            Flight.find(query, function (err, docs) {
                if (err) {
                    res.send(err);
                    return;
                }

                flights = docs;
                //for (var i in docs)
                //    flight =
                //res.json(docs);

                if (req.query.return_date !== undefined) {
                    query.departure = req.query.arrival;
                    query.arrival = req.query.departure;
                    query.date = req.query.return_date;

                    Flight.find(query, function (err, docs) {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        flights = flights.concat(docs);
                        res.json(flights);
                    });
                }

            });
            break;
        }

        case GET_ARRIVAL: {
            var projection = {arrival: 1};
            Flight.find({departure: req.query.departure}, projection, function (err, docs) {
                if (err)
                    res.send(err);
                res.json(docs);
            });
            break;
        }

        case GET_ALL_FLIGHTS: {
            Flight.find({}, function (err, docs) {
                if (err)
                    res.send(err);
                res.json(docs);
            });
            break;
        }
    }
});

function filterQuery(query) {
    if (query.departure !== undefined && query.arrival !== undefined &&
        query.seat_count !== undefined && query.date !== undefined)
        return SEARCH_FLIGHTS;

    if (query.departure !== undefined)
        return GET_ARRIVAL;

    return GET_ALL_FLIGHTS;
}



var SEARCH_FLIGHTS = 1;
var GET_ALL_FLIGHTS = 2;
var GET_ARRIVAL = 3;


module.exports = router;

