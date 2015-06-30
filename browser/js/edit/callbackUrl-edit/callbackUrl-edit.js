app.config(function ($stateProvider) {

    $stateProvider.state('callbackUrl-edit', {
        url: '/callbackUrl-edit',
        templateUrl: 'js/edit/callbackUrl-edit/callbackUrl-edit.html',
        controller: 'CallbackUrlEditCtrl'
    });

});

app.controller('CallbackUrlEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});