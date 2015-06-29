app.factory('AccountFactory', function ($http) {

	var getAccountInfo = function(user){
		return $http.get('/account/' + user.tchoPayId).then(function(response){
			return response.data;
		})
	}
	return {
	        getAccountInfo: getAccountInfo	           
	};

});