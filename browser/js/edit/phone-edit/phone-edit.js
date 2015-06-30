app.config(function ($stateProvider) {

    $stateProvider.state('phone-edit', {
        url: '/phone-edit',
        templateUrl: 'js/edit/phone-edit/phone-edit.html',
        controller: 'PhoneEditCtrl'
    });

});

app.controller('PhoneEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});