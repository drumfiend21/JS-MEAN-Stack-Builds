'use strict';
var router = require('express').Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');

var UserModel = mongoose.model('User');

router.post('/validate', function (req, res){
	var apiKey = req.body.apiKey
	console.log("Validating web app api key: just got api Key on back end", apiKey)

	UserModel.findOne({apiKey : apiKey }).exec().then(function (account) {
		console.log("get account route successful,", account)
		account.webAppServerSecret
		account.webAppTransactionId

		res.send(account);
	});
});