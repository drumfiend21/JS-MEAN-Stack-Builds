'use strict';
var router = require('express').Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');

var UserModel = mongoose.model('User');

router.get('/', function (req, res){
	var account = req.body.account
	console.log("just got account info")

	UserModel.find({tchoPayId : account }).exec().then(function (account) {
		console.log("get account route successful," account)
		res.send(account);
	});
});