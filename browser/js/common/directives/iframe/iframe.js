app.directive('payFrame', function ($rootScope, AuthService, CheckoutFactory, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/iframe/iframe.html',
        link: function (scope) {

		    //Authenticate Domain
		    scope.iframe.webAppDomain = "http://localhost:1337"
		    if(angular.element(window.parent.window.location)[0]['origin'] === scope.iframe.webAppDomain) scope.enterinfo = true;
		    if(angular.element(window.parent.window.location)[0]['origin'] !== scope.iframe.webAppDomain) scope.merchanterror = true;
		    
		    //State Changes (ng-if) All falsey values.
		    scope.authorizing
		    scope.merchanterror
		    scope.paymenterror
		    scope.paymentprocessed

			    //hide navbar
			    angular.element(window.document['body']['childNodes'][1]).remove()

		    //Controller accesses parent window and assigns button container 
		    //data-attributes to scope variables

		    scope.iframe = {};
		    scope.iframe.chargeAmount = 20.00 // = some parent window data attr 
		    scope.iframe.itemDescription = "banana" // = some parent window data attr 
		    scope.iframe.webAppTransactionId = 13152 // = some parent window data attr 
		    scope.iframe.apiKey = "ak_2308235283095790325" // = some parent window data attr

		    //Pull rest of properties from iframe
		    scope.iframe.buyerAccount
		    scope.iframe.pin

		    //Get buyer location
		    navigator.geolocation.getCurrentPosition(function(geo){
		        console.log(geo)
		        scope.iframe.location = geo
		        scope.iframe.timestamp = geo.timestamp;
		    })    

		    scope.someFunc = function(){
		        //create a JSON object from this
		        //send api call to backend, create and save a database object 
		        //take API key and search database
		        console.log("transaction object to be submitted to database",scope.iframe)
		        
		        //hide enterinfo show authorizing transaction
	        	scope.enterinfo = false;
	        	scope.authorizing = true;

	        	//Validate Web App Api Key and Secret
	        	CheckoutFactory.submitTransaction(scope.iframe.apiKey, angular.element(window.parent.window.location)[0]['origin'])
	        	.then(function (userDocument){
					//TO DO
					//change state 
					//if payment success response, scope.paymentprocessed = true
					//if payment error response, scope.paymenterror = true
					//if merchant error response, scope.merchanterror = true
	        	})
		    }
        }
    }
})