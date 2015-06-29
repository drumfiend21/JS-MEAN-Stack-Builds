'use strict';
var router = require('express').Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');

var UserModel = mongoose.model('User');

var createTchoPayUserId = function (info) {
    var hash = crypto.createHash('sha1');
    hash.update(info.email);
    hash.update(Date.now().toString());
    info.tchoPayId = "id_"+hash.digest('hex');
    return info;
};

var createApiKey = function (info) {
    var hash = crypto.createHash('sha1');
    hash.update(info.tchoPayId);
    hash.update(Date.now().toString());
    info.apiKey = "pk_"+hash.digest('hex');
    return info;
};

var createApiSecret = function (info) {
    var hash = crypto.createHash('sha1');
    hash.update(info.apiKey);
    hash.update(Date.now().toString());
    info.apiSecret = "sk_"+hash.digest('hex');
    return info;
};

router.post('/', function (req, res) {
	var info = req.body.signupInfo
	console.log("you're in the sign up post route")
	console.log("sign up form received in route", info)
	// console.log("createTchoPayUserId function,",createTchoPayUserId)
	// console.log("firing function,", createTchoPayUserId(info))
	
	createTchoPayUserId(info);
	createApiKey(info);
	createApiSecret(info);
	
	UserModel.create(info, function (err, user) {
	  if (err) return handleError(err);
	  // saved!
	  console.log("user created in database!")
	  res.send(user)
	})



	// createTchoPayUserId(info).then(function (info){
	// 	console.log("created tchoPayUserId,", info)
	// 	return createApiKey(info)
	// })
	// .then(function (info){
	// 	console.log("created apiKey,", info)
	// 	return createApiSecret(info)
	// })
	// .then(function (info){
	// 	console.log("created apiSecret,", info)
	// 	return UserModel.create(info, function (err, user) {
	// 	  if (err) return handleError(err);
	// 	  // saved!
	// 	  console.log("user created in database!")
	// 	  res.send(user)
	// 	})
		
	// })
	// res.sendStatus(200);
});
