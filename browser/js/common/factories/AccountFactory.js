app.factory('AccountFactory', function ($http, $state) {

	var getAccountInfo = function(user){
		return $http.get('/api/account/' + user.tchoPayId).then(function(response){
			console.log(response.data)
			return response.data;
		})
	}

	var editAccount = function(property){
		if(property === 'merchantId') $state.go("merchantId-edit");
		if(property === "email") $state.go("email-edit");
		if(property === "phone") $state.go("phone-edit");
		if(property === "description") $state.go("description-edit");
		if(property === "callbackUrl") $state.go("callbackUrl-edit");
		if(property === "sellerAccount") $state.go("account-edit");
	}

	return {
	        getAccountInfo: getAccountInfo,
	        editAccount: editAccount	           
	};

});