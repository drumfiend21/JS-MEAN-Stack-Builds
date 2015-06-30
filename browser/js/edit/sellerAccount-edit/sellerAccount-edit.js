app.config(function ($stateProvider) {

    $stateProvider.state('sellerAccount-edit', {
        url: '/sellerAccount-edit',
        templateUrl: 'js/edit/sellerAccount-edit/sellerAccount-edit.html',
        controller: 'sellerAccountEditCtrl'
    });

});

app.controller('sellerAccountEditCtrl', function ($scope, AuthService, $state, AccountFactory) {

	AuthService.getLoggedInUser().then(function (user){
		
		//to display in edit form
		$scope.currentSellerAccount = user.sellerAccount
		
		//to send to back end
		$scope.user = {};
		$scope.user.tchoPayId = user.tchoPayId
		$scope.user.email = user.email
		$scope.user.password
		$scope.user.sellerAccount
		$scope.user.property = "sellerAccount"

		//submit the edited account info
		$scope.submitEditCard = function(){
			AccountFactory.submitEditCard($scope.user, $scope)			
		}

	});

});