app.config(function ($stateProvider) {

    $stateProvider.state('description-edit', {
        url: '/description-edit',
        templateUrl: 'js/edit/description-edit/description-edit.html',
        controller: 'DescriptionEditCtrl'
    });

});

app.controller('DescriptionEditCtrl', function ($scope, AuthService, $state) {

	AuthService.getLoggedInUser().then(function (user){
		
		$scope.user = user
		// $scope.$digest();

	});

});