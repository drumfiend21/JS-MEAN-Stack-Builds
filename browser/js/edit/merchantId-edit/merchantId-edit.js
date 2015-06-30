app.config(function ($stateProvider) {

    $stateProvider.state('merchantId-edit', {
        url: '/merchantId-edit',
        templateUrl: 'js/edit/merchantId-edit/merchantId-edit.html',
        controller: 'MerchantIdEditCtrl'
    });

});

app.controller('MerchantIdEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});