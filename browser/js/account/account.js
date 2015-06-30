app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl',
        data: {
        	authenticate: true
        }
    });

});

app.controller('AccountCtrl', function ($scope, AuthService, AccountFactory, $state) {
    
   	console.log("authentication check,", AuthService.isAuthenticated())
 
    AuthService.getLoggedInUser().then(function (user){

    	console.log("retrieved user,", user)

        AccountFactory.getAccountInfo(user).then(function(account){
        	$scope.user = account;
        });

        console.log("updated user information to be redisplayed,", $scope.user);

    });

    $scope.editAccount = AccountFactory.editAccount

});