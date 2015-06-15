app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, $window, $rootScope) {

// need to store blends in localstorage.... use localstorage.getItem and localstorage.setItem
// $scope.saved = localStorage.getItem()?
    // $scope.items = function () {
    //     blends: [{
    //         info:
    //         quantity:
    //         price:
    //     }]
    // },

    $scope.removeItem = function (index){
        $scope.items.blends.splice(index, 1);
        
    },

    $scope.editItem = function (index, quantity){
        $scope.items.blends[index].quantity = quantity;
    },

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.items.blends, function(blend) {
            total += blend.quantity * blend.price;
        })
        return total;
    }
});