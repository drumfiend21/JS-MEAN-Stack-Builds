'use strict';
var router = require('express').Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');

var UserModel = mongoose.model('User');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/:tchoPayId', ensureAuthenticated, function (req, res){
	var account = req.params.tchoPayId
	console.log("just got account info")

	UserModel.findOne({tchoPayId : account }).exec().then(function (account) {
		console.log("get account route successful,", account)
		res.send(account);
	});
});