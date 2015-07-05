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
var SuspectTransactionModel = mongoose.model('SuspectTransaction');

router.post('/validate', function (req, res){
	//REQ.BODY.transactionObject
	// >Buyer Account*
	// >Pin*
	// >Location*
	// >Amount
	// >Description
	// >WebAppTransId
	// >Timestamp
	// >ApiKey
	
	//REQ.BODY.browserDomain
	// >webAppDomain

	//TO DO: Sanitize all data coming from req.body
	//currently NOT sanitized

	//Declare variables in route scope for error and success handlers
	var paymentSuccessObj = {}
	var transactionInProgressId
	var webAppApiSecretServerError
	var paymentSuccess
	var paymentFail
	var tchoTchoServerError
	var approvedFail
	var apiSecretFail
	var domainError	
	var apiKeyMongoLookupFail
	var deleteTransactionMongoFail
	var deleteTransaction


	UserModel.findOne({apiKey : req.body.transactionObject.apiKey }).exec().then(function (account) {
		console.log("get account route successful,", account)

		//Authenticate Browser Domain
		if(req.body.browserDomain === account.webAppDomain){
			
			var webAppApiCheckObject = {

				webAppServerSecret: account.webAppServerSecret,
				webAppTransactionId : req.body.transactionObject.webAppTransactionId,
				chargeAmount: req.body.transactionObject.chargeAmount,
				apiSecret : null,
				approved : false,
				completed: false,
				//TO DO: sanitize outcome from tcho tcho back to web app
				outcome: null

			}

			//Request api secret from web app server
			request.post({url: account.callbackUrl, form: 
				{
					webAppApiCheckObject: webAppApiCheckObject

				}},function(err,httpResponse,body){
					
					if(err){
						webAppApiSecretServerError = true
						return next(err)
					}

					//Authenticate api secret from web app server
					if(body && body.apiSecret === account.apiSecret){
						//Authenticate if authorized by merchant server
						if(body.approved === true){
							
							var transactionDocument = {
							    webAppTransactionId: req.body.transactionObject.webAppTransactionId,
							    buyerAccount: req.body.transactionObject.buyerAccount,
							    chargeAmount: req.body.transactionObject.chargeAmount,
							    location: req.body.transactionObject.location,
							    timestamp: req.body.transactionObject.timestamp,
							    sellerAccount: account.sellerAccount,
							    merchantId: account.merchantId,
							    tchoPayId: account.tchoPayId,
							    outcome: "",
							}

							//Store authenticated transaction to database
							TransactionModel.create(transactionDocument, function (err, transactionDocumentInDatabase) {
								//TO DO write sanitation.  This will prevent an error from ever happening on document save.
								if(err) return next(err)

								//create ourTransactionId on this transaction document (call model static)
								transactionDocumentInDatabase.createOurTransactionId(transactionDocumentInDatabase._id)	

								//store transactionId in case of later error outside scope
								transactionInProgressId = transactionDocumentInDatabase._id

								//Submit Transaction to TchoTcho
								//   this will have to be edited as we learn their process
								request.post({url: tchotchoUrl, form:
									{
										buyerAccount: req.body.transactionObject.buyerAccount,
										pin : req.body.transactionObject.pin,
										chargeAmount: transactionDocumentInDatabase.chargeAmount,
										sellerAccount : transactionDocumentInDatabase.sellerAccount,
										ourTransactionId : transactionDocumentInDatabase.ourTransactionId,
										outcome: null

									}

								},function(err, httpResponse, body){
										if(err){
											//TCHOTCHO SERVER ERROR
											transactionDocumentInDatabase.outcome = err  //specify tchotcho outcome => body.something or err 
											transactionDocumentInDatabase.save();
											
											tchoTchoServerError = true;
											return next(err);

										}

										//Response is payment success on body
										//TO DO: extract success identifier for conditional
										if(body.success){

											//SUCCESSFUL TRANSACTION or more communicatin with TchoTcho
											//TO DO: if(body.outcome==="success") or similar
											//set success outcome on transaction document in database

											// TO DO: specify tchotcho outcome
											paymentSuccessObj// = body.successMessage 
											transactionDocumentInDatabase.outcome = paymentSuccessObj; 
											transactionDocumentInDatabase.save()

											paymentSuccess = true;
											return 


										}
										//Response is payment failed on body
										//TO DO: extract failure identifier for conditional
										if(body.fail){


											deleteTransaction = true;
											return

										}

								})
							});
						}else{
							//WEB APP APPROVE ERROR
							
							approvedFail = true;
						}

					}else{
						//WEB APP API SECRET ERROR

						apiSecretFail = true;
					}

			})
			
			
		}else{
			//BROWSER DOMAIN ERROR 
			

			domainError= true;
		}

		//PAYMENT SUCCESS HANDLER
		if(paymentSuccess){

			//POST PAYMENT SUCCESS TO WEB APP SERVER
			request.post({url: callbackUrl, form:
										{
											confirmation: true,
											chargeAmount: transactionDocumentInDatabase.chargeAmount,
											webAppTransactionId: req.body.transactionObject.webAppTransactionId,
											timestamp: req.body.transactionObject.timestamp,
											//TO DO: sanitize outcome obj for account information
											outcome: paymentSuccessObj 
										}

			},function(err, httpResponse, body){
				if(err){
					//TO DO: SUSPEND API KEY 
					//Automated Twilio Email
					//Internal Alert to us

					//delete the transaction
					deleteTransaction = true
					return next(err)
					

				}

				//SEND SUCCESS TO iFRAME
				var SuccessObject = {
					merchantError: false,
					//TO DO: this will need to be updated with the tchotcho api
					paymentError: {
						key: false,
						pinError: false,
						accountError: false
					}
				}
				res.send(SuccessObject)
			})
		}

		//DELETE TRANSACTION DOCUMENT
		if(deleteTransaction){
			//Look up transaction in our database and delete it
			TransactionModel.findByIdAndRemove(transactionInProgressId).exec().then(function (account) {
				
				var webAppConfirmationError = true
				var nullifyTransaction = true;

				return next(err)

			})
			.catch(function(e) {
		    //DELETE COMPLETED TRANSACTION DUE TO WEB APP CONFIRMATION FAIL LOOKUP FAILED

		    	deleteTransactionMongoFail = true;
				return next(err)
			});
		}

			
		//ERROR HANDLERS
		if(domainError || apiSecretFail || approvedFail || webAppApiSecretServerError || tchoTchoServerError || webAppConfirmationError){

			//API SECRET ERROR response 
			//Sanitize and Store to database with label FRAUD
			
			var suspectTransactionDocument = {
				   
				    webAppTransactionId: req.body.transactionObject.webAppTransactionId,
				    buyerAccount: req.body.transactionObject.buyerAccount,
				    sellerAccount: account.sellerAccount,
				    merchantId: account.merchantId,
				    tchoPayId: account.tchoPayId,
				    chargeAmount: req.body.transactionObject.chargeAmount,
				    itemDescription: req.body.transactionObject.itemDescription,
				    location: req.body.transactionObject.location,
				    timestamp: req.body.transactionObject.timestamp,
				    //TO DO set these properties
				    outcome: null,
				    nullifyTransaction: false,

			}	

			SuspectTransactionModel.create(fraudulentTransactionDocument, function (err, suspectTransactionDocumentInDatabase) {
				if(err) return next(err)

				//create ourTransactionId for this suspect transaction document
				if(webAppConfirmationError) suspectTransactionDocumentInDatabase.nullifyTransaction = true;

				suspectTransactionDocumentInDatabase.ourTransactionId = suspectTransactionDocumentInDatabase.createOurTransactionId(suspectTransactionDocumentInDatabase._id);
				suspectTransactionDocumentInDatabase.outcome = suspectOutcome
				suspectTransactionDocumentInDatabase.save();

				//send merchant error response (bad api secret or domain)
				var errorObject = {
					merchantError: true,
					//TO DO: this will need to be updated with the tchotcho api
					paymentError: {
						key: false,
						pinError: false,
						accountError: false
					}
				}
				res.send(apiKeyErrorObject)

			})
		}


	}).catch(function(e) {
	    //API KEY LOOKUP FAILED
	    apiKeyMongoLookupFail = true
	    return next(err)

	});

	if(apiKeyMongoLookupFail || deleteTransactionMongoFail){

				//TO DO: reassign signifiers for these two errors
				var lookupErrorObject = {
					ourFault : false,
					merchantError: true,
					//this will need to be updated with the tchotcho api
					paymentError: {
						key: false,
						pinError: false,
						accountError: false
					}
				}

				if(deleteTransactionMongoFail) lookupErrorObject.ourFault = true

				res.send(lookupErrorObject)

	}
});