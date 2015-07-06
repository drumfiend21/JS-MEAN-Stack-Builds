app.directive('payFrame', function ($rootScope, AuthService, CheckoutFactory, AUTH_EVENTS, $state, $http) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/iframe/iframe.html',
        link: function (scope) {

		    //Build Transaction Object Scaffold
		    scope.iframe = {};

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

		    scope.iframe.chargeAmount = 20.00 // = some parent window data attr 
		    scope.iframe.webAppTransactionId = 13152 // = some parent window data attr 
		    scope.iframe.apiKey = "ak_2308235283095790325" // = some parent window data attr
	        scope.iframe.timestamp //set when buy button is pressed (in function someFunc) 

		    //Pull rest of properties from iframe
		    scope.iframe.buyerAccount
		    scope.iframe.pin

		    //Get buyer location
		    navigator.geolocation.getCurrentPosition(function(geo){
		        console.log(geo)
		        scope.iframe.location = geo
		    })    

		    scope.closeIframe = function(){

		    	console.log("you just clicked the close button")
		    	console.log(window.parent.window)

		    }



		    scope.someFunc = function(){
		        //create a JSON object from this
		        //send api call to backend, create and save a database object 
		        //take API key and search database

		        //set timestamp on transaction
		        scope.iframe.timestamp = Date.now().toString()
		        
		        //hide enterinfo show authorizing transaction
	        	scope.enterinfo = false;
	        	scope.authorizing = true;

		        console.log("transaction object to be submitted to database",scope.iframe)
	        	
	        	//Validate Web App Api Key and Secret
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