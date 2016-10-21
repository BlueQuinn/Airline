/**
 * Created by lequan on 10/20/2016.
 */

var router = require('express').Router();
var Airport = require('../models/airport');

router.get('/', function (req, res) {
   Airport.find({}, function (err, docs) {
       if (err)
           res.send(err);
       res.json(docs);
   });
});

router.post('/', function (req, res) {

    var airport = Object.assign(new Airport(), req.body);

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