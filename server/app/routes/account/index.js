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




router.put('/edit', ensureAuthenticated, function (req, res){
	
	console.log("req.body hitting edit route,",req.body)

	var rewriteUserDocument = function(property){
		UserModel.findOne({tchoPayId: req.body.tchoPayId}).exec().then(function (user){
			if (user.correctPassword(req.body.password)) {
				if(property === "password"){
					user[property] = req.body.newPasswordOne
				}
				else{
					user[property] = req.body[property]
				}
				user.save(function(err, user){
					if(err) console.log("error saving edited account data,",err)
					console.log("user rewrite saved", user)
					res.send(user);
				})
			}else{
				res.send("invalid password")
			}
		})
	}

	if(UserModel.whiteList.indexOf(req.body.property) > -1) {
		rewriteUserDocument(req.body.property)
	}else{
		res.sendStatus(403);
	}

})