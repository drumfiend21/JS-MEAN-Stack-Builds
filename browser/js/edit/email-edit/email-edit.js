app.config(function ($stateProvider) {

    $stateProvider.state('email-edit', {
        url: '/email-edit',
        templateUrl: 'js/edit/email-edit/email-edit.html',
        controller: 'EmailEditCtrl'
    });

});

app.controller('EmailEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});