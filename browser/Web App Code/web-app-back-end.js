// WEB APP SERVER CODE
//Sample code for Node.js

//Node server requirements
var crypto = require('crypto');
var request = require('request');

//store your API Secret as a string on this variable
var apiSecret 

//1.  EVERYTHING BELOW IS WITHIN YOUR ROUTE THAT SERVES THE PAGE CONTAINING THE CHECKOUT BUTTON


    //generate timestamp (nonce value for hash)
    var timestamp = Date.now()


    var createTransactionHash = function (secret, timestamp) {
       var hash = crypto.createHash('sha2');
       hash.update(timestamp.toString());
       hash.update(secret.toString());
       return "ti_"+hash.digest('hex');
    };
    
    //generate hash
    var transactionHash = createTransactionHash(apiSecret,timestamp)

    //BEFORE SERVING HTML
    //push the transactionHash into the page HTML being served, store it on 
    //the global variable, "transactionHashValue", supplied by us for your front end javascript.
    //Also, push the timestamp into the page HTML being served, store it on 
    //the global variable, "timestamp", supplied by us for your front end javascript
    //E.g. using swig



//2.  CONFIRMATION ROUTE

  router.post('/confirm', function (req, res, next) {
    //intakes transactionOutcomeObject on req.body
    var transactionOutcomeObject = req.body

    //Authenticate that outcome object is coming from TchoPay
    var createConfirmOutcomeHash = function (secret, timestamp, outcomeKey) {
       var hash = crypto.createHash('sha2');
       hash.update(timestamp.toString());
       hash.update(secret.toString());
       hash.update(outcomeKey.toString());
       return "oh_"+hash.digest('hex');
    };

      //Store confirmation outcome hash
      var confirmOutcomeHash = createConfirmOutcomeHash(apiSecret, req.body.transactionTimeStamp, req.body.outcomeKey)

      //Compare confirmation outcome to incumbent outcome received 
      if(confirmOutcomeHash === req.body.outcomeHashedValue){
        //this outcome incumbent is authenticated as sourced from TchoPay
        request.post({url:'https://tchopay.com/confirm-transaction', 
            formData: transactionOutcomeObject
          }, function optionalCallback(err, httpResponse, body) {
          
          //error handling if no confirmation response from TchoPay server
          if(err){
            return console.log('your transaction may have been processed, but we didnt get a confirmation from TchoPay; please contact them', err)
          }

          //expect response containing same transactionOutcomeObject
          //with 'confirmed' property set to 'true'
          var transactionReceipt = body;

          //Check that TchoPay has authenticated the transaction receipt 
          //by changing the 'confirmed' property to true
          if(transactionReceipt.confirmed === true){
            //At this point the transaction is fully authorized and TchoPay completes communication
            //for this transaction.

            //Web app developer can store this transaction receipt in their database now.
            //e.g.
            // Model.create(transactionReceipt).exec().then(function (user) {
              res.send(0);
            // });
            
          }else{
            //if due to communication error TchoPay did not authenticate the receipt
            //send false to your front end i
            res.send(1)
          }
        })
      }else{
        //the incumbent outcome object did not authenticate as coming from TchoPay
        //choose your recourse
        res.send(2)
      }

    //makes post request to 
    //https://tchopay.com/confirm-transaction
  }, next)
  