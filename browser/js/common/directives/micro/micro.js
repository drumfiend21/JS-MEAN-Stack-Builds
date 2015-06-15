app.directive('micro', function (AuthService) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/micro/micro.html',
        scope: {
            micro: '='
        },
        link: function (scope) {
        	//checks if current user is admin
            AuthService.getLoggedInUser().then(function (currUser){
                scope.isAdmin = currUser.admin;
            })
		}
    }

});