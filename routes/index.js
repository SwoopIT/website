var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'SwoopIt'});
});

router.get('/admin', function (req, res, next) {
	res.render('admin', {title: 'Admin Console'});
});
router.get('/item', function (req, res, next) {
	res.render('item', {title: 'New Item'});
});
router.get('/blacklist', function (req, res, next) {
	res.render('blacklist', {title: 'Blacklist User'});
});
router.get('/items', function (req, res, next) {
	res.render('items', {title: 'Remove Items'});
});
router.get('/login', function (req, res, next) {
	res.render('login', {title: 'Login'});
});
module.exports = router;
