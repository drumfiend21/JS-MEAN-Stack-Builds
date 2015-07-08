app.directive('payFrame', function ($rootScope, AuthService, CheckoutFactory, AUTH_EVENTS, $state, $http) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/iframe/iframe.html',
        link: function (scope) {

        	//FOR TESTING: because of nested index.html
        	$("#checkout-button").remove()

        	console.log("the iframe directive link is running")

       		//BUILDING THE TRANSACTION OBJECT (SEND TO TCHOPAY)

			var apiPublicKey = document.getElementById("tchopay-script").getAttribute("data-key")
			var amount = document.getElementById("tchopay-script").getAttribute("data-amount")
			var timestamped = document.getElementById("tchopay-script").getAttribute("data-timestamp")
			var transactionHash = document.getElementById("tchopay-script").getAttribute("data-transactionhashvalue")


			//checkoutComplete function to call on transaction outcome
			window.parent.checkoutComplete

			// console.log(timestamp)
			// console.log(transAuthId)
			console.log(document.getElementById("tchopay-script"))
			console.log(amount)
			console.log(apiPublicKey)
			console.log(timestamped)
			console.log(transactionHash)

//////////////////////////////////////////////////////////////
		   
		    //Build Transaction Object Scaffold
		    scope.iframe = {};

		    //Authenticate Domain
		    scope.enterinfo = true;
		    // scope.iframe.webAppDomain = "http://localhost:1337"
		    // if(angular.element(window.parent.window.location)[0]['origin'] === scope.iframe.webAppDomain) scope.enterinfo = true;
		    // if(angular.element(window.parent.window.location)[0]['origin'] !== scope.iframe.webAppDomain) scope.merchanterror = true;
		    
		    //State Changes (ng-if) All falsey values.
		    scope.authorizing 
		    scope.merchanterror
		    scope.paymenterror
		    scope.paymentprocessed

			    //hide navbar
			    // angular.element(window.document['body']['childNodes'][1]).remove()

		    //Controller accesses parent window and assigns button container 
		    //data-attributes to scope variables

		    scope.iframe.chargeAmount = document.getElementById("tchopay-script").getAttribute("data-amount") // = some parent window data attr 
		    scope.iframe.webAppTransactionId = document.getElementById("tchopay-script").getAttribute("data-transAuthId")// = some parent window data attr 
		    scope.iframe.apiKey = document.getElementById("tchopay-script").getAttribute("data-key") // = some parent window data attr
	        scope.iframe.timestamp = document.getElementById("tchopay-script").getAttribute("data-timestamp") //set when buy button is pressed (in function someFunc)
	        // scope.iframe.sellerAccount =  

		    //Pull rest of properties from iframe
		    scope.iframe.buyerAccount
		    scope.iframe.pin

		    //Get buyer location
		    navigator.geolocation.getCurrentPosition(function(geo){
		        console.log(geo)
		        scope.iframe.location = geo
		    })    

		    console.log($(window.parent))
		    


		    scope.closeIframe = function(){

		    	console.log("you just clicked the close button")
		    	
		    	// $(window.parent.window.document.all[45]).animate({top: "100%", opacity: 0}, 500, 'easeInOutBack')
		    	$(window.parent.window.document.all[46]).animate({top: "100%", opacity: 0}, 500, 'easeInOutBack');
		    	var close = function(){
		    		$(window.parent.window.document.all[46]).remove()
		    		//TO DO REMOVE BACKGROUND DIV
		    		// $(window.parent.window.document.children[0].children[2].context).remove()
		    	}
		    	setTimeout(close, 900)
		    }

		    // .toggleClass("iframe-fadein iframe-fadeout")



		    scope.someFunc = function(){
		        //create a JSON object from this
		        //send api call to backend, create and save a database object 
		        //take API key and search database

		        //set timestamp on transaction
		        //OUTDATED with new transauth hash
		        // scope.iframe.timestamp = Date.now().toString()
		        
		        //hide enterinfo show authorizing transaction
	        	scope.enterinfo = false;
	        	scope.authorizing = true;

		        console.log("transaction object to be submitted to database", scope.iframe)
	        	
	        	// Validate Web App Api Key and Secret
	   //      	var submitTransaction = function(transactionObject){
				// 	//NOTE ON HTTP REQUEST IN CONTROLLER
				// 	//the security gains by having this call in the controller outmatch gains of modularity
				// 	//by having this call here, we are able to pass window.location.origin directly into our call
				// 	//with the smallest chance of its value being manipulated before submission
				// 	return $http.post('/api/checkout/validate', 
				// 		{
				// 			transactionObject: transactionObject, 
				// 			browserDomain: angular.element(window.parent.window.location)[0]['origin']

				// 		}).then(function(response){
				// 			//TO DO
				// 			delete scope.iframe;
				// 			return response.data
				// 	})
				// }
				// submitTransaction(scope.iframe)

		    }
        }
    }
})