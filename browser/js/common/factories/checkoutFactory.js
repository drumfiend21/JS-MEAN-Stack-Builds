app.factory('CheckoutFactory', function ($http, $state, AuthService, Session, $localStorage) {

	var submitTransactiontoDatabase = function(transaction){
		//On Route
			//check api key --> function (apiKey, webAppTransactionId, chargeAmount)
			//retrieve seller account --> function (apiKey)
			//assign ourTransactionId --> function (apiKey, timestamp)
		//this route call should return below
			//buyer account
			//pin
			//seller account
			//amount
			//ourTransId

		return $http.post('/api/account/edit', transaction).then(function(response){
			return response.data
		})
	}

	var validateApi = function(apiKey){
		return $http.post('/api/checkout/validate').then(function(response){
			return response.data
		})
	}

	return {
	        submitTransactiontoDatabase: submitTransactiontoDatabase        
	};

});