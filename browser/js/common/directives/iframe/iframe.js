app.directive('payFrame', function ($rootScope, AuthService, CheckoutFactory, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/iframe/iframe.html',
        link: function (scope) {

		    
		    //Authenticate Domain
		    if(angular.element(window.parent.window.location)[0]['origin']==="http://localhost:1338") scope.enterinfo = true;
		    if(angular.element(window.parent.window.location)[0]['origin']!=="http://localhost:1338") scope.merchanterror = true;
		    
		    //Hide and Show Elements.  All falsey values.
		    scope.authorizingmerchant 
		    scope.merchanterror
		    scope.authorizingtchotcho
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
		        

		        //hide enterinfo show authorizing merchant
	        	scope.enterinfo = false;
	        	scope.authorizingmerchant = true;

	        	//Validate Web App Api Key and Secret
	        	CheckoutFactory.validateApi(scope.iframe.apiKey).then(function (userDocument){

	        	})
	        	        
		        //http call to back end
		        CheckoutFactory.submitTransactiontoDatabase(scope.iframe).then(function (transaction){
		        	//hide authorizing merchant
		        	scope.authorizingmerchant = false
		        	
		        	//if call returns error show merchant error		        	
		        	//scope.merchanterror = true

		        	//if call returns success
		        	//scope.authorizingtchotcho = true
		        	//make HTTP call to tcho tcho
			        	//
			        	//scope.
			        	//CheckoutFactory.submitTransactiontoTchoTcho(transact)


		        })
		    }

        }

    }

})