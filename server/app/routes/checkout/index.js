'use strict';
var router = require('express').Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');
var request = require('request');

var UserModel = mongoose.model('User');
var TransactionModel = mongoose.model('Transaction');

router.post('/validate', function (req, res){
	//pull properties from req.body
	var apiKey = req.body.apiKey
	var browserDomain = req.body.browserDomain

	//TO DO: Sanitize all data coming from req.body
	//currently NOT sanitized


	UserModel.findOne({apiKey : apiKey }).exec().then(function (account) {
		console.log("get account route successful,", account)

		//Authenticate Browser Domain
		if(browserDomain === account.webAppDomain){
			//Request api secret from web app server
			request.post({url: account.callbackUrl, form: 
				{
					webAppServerSecret: account.webAppServerSecret,
					webAppTransactionId : req.body.webAppTransactionId,
					chargeAmount: req.body.chargeAmount,
					apiSecret : null,
					approved : false

				}},function(err,httpResponse,body){
					//Authenticate api secret from web app server
					if(body.apiSecret === account.apiSecret){
						//Authenticate if authorized by merchant server
						if(body.approved === true){
							
							var transactionDocument = {
								    webAppTransactionId: req.body.webAppTransactionId,
								    buyerAccount: req.body.buyerAccount,
								    sellerAccount: account.sellerAccount,
								    merchantId: account.merchantId,
								    tchoPayId: account.tchoPayId,
								    chargeAmount: req.body.chargeAmount,
								    itemDescription: req.body.itemDescription,
								    location: req.body.location,
								    timestamp: req.body.timestamp 
							}

							//Store authenticated transaction to database
							TransactionModel.create(transactionDocument, function (err, transactionDocumentinDatabase) {
								if(err) return next(err)

								//Submit Transaction to TchoTcho
								//   this may have to be edited as we learn their process
								request.post({url: account.callbackUrl, form:
									{
										buyerAccount: req.body.buyerAccount,
										pin : req.body.pin,
										chargeAmount: req.body.chargeAmount,
										webAppTransactionId : req.body.webAppTransactionId,
										sellerAccount : account.sellerAccount

									}},function(err,httpResponse,body){
										if(err){
											//TO DO Handle call error
											transactionDocumentinDatabase.outcome = ""

										}

										//SUCCESSFUL TRANSACTION or more communicatin with TchoTcho
										//TO DO: if(body.outcome==="success") or similar
											//set success outcome on transaction document in database
										transactionDocumentinDatabase.outcome = "success";
										transactionDocumentinDatabase.save()

										var successObject // = some object to display success info in iframe
										res.send(successObject)
								}
							});
					}else{
						//HANDLE FRAUDULENT REQUEST.  
						//Sanitize and Store to database with label FRAUD
						
						var fraudulentTransactionDocument = {

						}	

						TransactionModel.create(fraudulentTransactionDocument, function (err, user) {
							if(err) return next(err)

							//send merchant error response (bad api secret or domain)

						})
					}
			})
			
		}


		res.send(account);
	});
});