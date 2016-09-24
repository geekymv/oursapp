var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 用户登录接口*/
router.post('/login', function(req, res, next) {
	console.log('username = ' + req.body.username);
	console.log('password = ' + req.body.password);
	res.json('{"hello": "world"}');
});

module.exports = router;
