app.config(function ($stateProvider) {

    $stateProvider.state('sellerAccount-edit', {
        url: '/sellerAccount-edit',
        templateUrl: 'js/edit/sellerAccount-edit/sellerAccount-edit.html',
        controller: 'sellerAccountEditCtrl'
    });

});

app.controller('sellerAccountEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});