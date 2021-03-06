var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'SwoopIt'});
});

router.get('/admin', function (req, res, next) {
	res.render('admin', {title: 'Console'});
});
router.get('/item', function (req, res, next) {
	res.render('item', {title: 'New Item'});
});
router.get('/blacklist', function (req, res, next) {
	res.render('blacklist', {title: 'Blacklist'});
});
router.get('/users', function (req, res, next) {
	res.render('users', {title: 'Users'});
});
router.get('/items', function (req, res, next) {
	res.render('items', {title: 'Items'});
});
router.get('/login', function (req, res, next) {
	res.render('login', {title: 'Login'});
});
router.get('/category', function (req, res, next) {
	res.render('category', {title: 'New Category'});
});
router.get('/categories', function (req, res, next) {
	res.render('categories', {title: 'Categories'});
});
router.get('/revenue', function (req, res, next) {
	res.render('revenue', {title: 'Revenue'});
});
module.exports = router;
