var express = require('express');
var router = express.Router();
var Db = require('../utils/mongDB');

var app = express();

/* GET home page. */
router.post('/', function(req, res, next) {
    Db.find('test', 'test', {}, function (err, data) {
        res.send(data)
    });
});

module.exports = router;
