app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/register',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, AuthService, $state) {

    console.log("you've hit the signupCtrl")
    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (signupInfo) {

        $scope.error = null;

        console.log("signup object,", signupInfo )
        
        // AuthService.signup(signupInfo).then(function (user) {

        //     $state.go('');

        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });

    };

});