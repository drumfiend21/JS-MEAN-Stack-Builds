app.config(function ($stateProvider) {

    $stateProvider.state('admin-user', {
        url: '/admin-user',
        templateUrl: 'js/admin-user/admin-user.html',
        controller: 'ManageUserCtrl'
    });

});

app.controller('ManageUserCtrl', function ($scope, AuthService, UserFactory, $state) {

    $scope.error = null;
    $scope.searchingUser = false;

//checks if current user is admin
    AuthService.getLoggedInUser().then(function (currUser){
            $scope.isAdmin = currUser.admin;
    });

//lists all users
    $scope.getAllUsers = function () {

        UserFactory.getAllUsers()
        .then(function (users) {
            $scope.userlist = users;
        })
        .catch(function () {
            $scope.error = 'Invalid action of listing all users.'
        })    
    };

//lists a user by id
    $scope.getUserById = function (id, info) {

        UserFactory.getUserById(id)
        .then(function (user) {
            $scope.userlist = user;
        })
        .catch(function () {
            $scope.error = 'Invalid action of listing a particular user.'
        })
    };

//get user by email
    $scope.getUserByEmail = function (email) {
        $scope.searchingUser = true;
        UserFactory.getUserByEmail(email)
        .then(function (user) {
            console.log(user);
            $scope.userlist = user;
        })
    }

//promotes user to admin; needs to be checked if working
    $scope.promoteUserStatus = function (id) {

        UserFactory.getUserById(id)
        .then(function (user) {
            UserFactory.promoteUserStatus(user._id, info)
            .then(function (user) {
                $scope.userlist = user;
            })
        })
        .catch(function () {
            $scope.error = 'Invalid promotion of user status.'
        })
    };

//deletes a user
    $scope.deleteUserById = function (id) {

        UserFactory.deleteUserById(id)
        .then(function (user) {
            $scope.userlist = user;
        })
        .catch(function () {
            $scope.error = 'Invalid action of deleting a user.'
        })
    };
});