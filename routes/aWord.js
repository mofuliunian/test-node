var express = require('express');
var router = express.Router();
var Db = require('../utils/mongDB');
var util = require('../utils/util')

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    Db.findCount('says', 'says', {}, function (err, data) {
      if (err) {
        res.send({err: err})
      }
      const count = data;
      const rnd = util.rnd(1, count);
      Db.connectDb(function(db) {
        const DB = db.db('says');
        const collection = DB.collection('says');
        var result = collection.find().skip(rnd).limit(1).toArray(function(err, data) {
          res.send(data[0])
        });
      })

    });
});

module.exports = router;
