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

module.exports = router;