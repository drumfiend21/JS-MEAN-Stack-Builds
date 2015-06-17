app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, UserFactory, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.createUser = function (user) {

        $scope.error = null;

        UserFactory.createUser(user)
        .then(function(createdUser) {
            console.log('this is before deleting address', createdUser)
            // _.omit(createdUser, 'address');
            console.log('this is after deleting address', createdUser)
            return AuthService.login(createdUser);
        })
        .then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });
    };

});