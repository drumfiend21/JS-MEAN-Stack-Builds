app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl'
    });

});

app.controller('AccountCtrl', function ($scope, AuthService, AccountFactory, $state) {
        
    AuthService.getLoggedInUser().then(function (user){

        $scope.user = AccountFactory.getAccountInfo(user);

        console.log("updated user information to be redisplayed,", $scope.user);

    });


});