'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');


var createOurTransactionId = function (merchantId) {
    var hash = crypto.createHash('sha1');
    hash.update(merchantId);
    hash.update(Date.now().toString());
    return hash.digest('hex');
};


var schema = new mongoose.Schema({
    webAppTransactionId: {
        type: String
    },
    buyerAccount: {
        type: String
    },
    sellerAccount: {
        type: String
    },
    merchantId: {
        type: String
    },
    tchoPayId: {
        type: String
    },
    chargeAmount: {
        type: Number
    },
    itemDescription: {
        type: String
    },
    location: {
        type: Object
    },
    timestamp:{
        type: Number
    },
    ourTransactionId:{
        type: String
    }
});

schema.statics.createOurTransactionId = createOurTransactionId;

mongoose.model('Transaction', schema);