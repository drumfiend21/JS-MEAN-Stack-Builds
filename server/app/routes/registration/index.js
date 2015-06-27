'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');


router.post('/', function (req, res) {
	console.log("you're in the sign up post route")
	console.log("sign up form received in route", req.body)
	res.sendStatus(200);
});
