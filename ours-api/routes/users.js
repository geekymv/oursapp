var express = require('express');
var router = express.Router();
var userDao = require('../modules/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 用户登录接口*/
router.get('/login', function(req, res, next) {
	var username = req.query.username;
	userDao.getUserByUsername(username, function(err, result) {
		res.json(result);
	});
});

/* 用户登录接口*/
router.post('/login', function(req, res, next) {
	var username = req.body.username;
	console.log('username = ' + req.body.username);
	console.log('password = ' + req.body.password);
	
	userDao.getUserByUsername(username);
	
	res.json('{"hello": "world"}');
});

/*用户注册*/
router.post('/regist', function(req, res, next) {
	var username = req.body.username;
	console.log('username = ' + req.body.username);
	console.log('password = ' + req.body.password);
	var user = {
		"username": username,
		"password": password
	};
	userDao.regist(user);
	res.json('{"message": "", "code": "", "data": ""}');
});

module.exports = router;
