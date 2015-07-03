app.factory('CheckoutFactory', function ($http, $state, AuthService, Session, $localStorage) {



	var submitTransaction = function(apiKey, browserDomain){
		return $http.post('/api/checkout/validate', 
			{
				apiKey: apiKey, 
				browserDomain: browserDomain

			}).then(function(response){
				//TO DO
				return response.data
		})
	}

	return {
	        submitTransaction: submitTransaction        
	};

});