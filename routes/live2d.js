var express = require('express');
var router = express.Router();
var data = require('../public/json/waifu-tips.json')

var app = express();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send(data)
});

module.exports = router;
