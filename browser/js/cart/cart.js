app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, BlendsFactory, CartFactory) {

    // $scope.items = function () {
    //     blends: [{
    //         info:
    //         quantity:
    //         price:
    //     }]
    // },
    $scope.showItems = function () {
        CartFactory.getCart('cart').then(function (items) {
            $scope.items = items;
        });
    },

    // BlendsFactory.getBlendById(blendid).then(function (blend){
    //   console.log(blend);
    // })

    $scope.removeItem = function (index){
        $scope.items.blends.splice(index, 1);
        
    },

    $scope.clearCart = function () {
        CartFactory.clearAllinCart().then(function () {
            return;
        })
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