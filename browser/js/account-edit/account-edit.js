app.config(function ($stateProvider) {

    $stateProvider.state('account-edit', {
        url: '/account-edit',
        templateUrl: 'js/account/account-edit.html',
        controller: 'AccountEditCtrl'
    });

});

app.controller('AccountEditCtrl', function ($scope, AuthService, $state) {






});