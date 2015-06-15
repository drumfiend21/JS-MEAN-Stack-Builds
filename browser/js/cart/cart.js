app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, CartFactory, OrdersFactory) {

    // $scope.items = function () {
    //     blends: [{
    //         info:
    //         quantity:
    //         price:
    //     }]
    // },

    //$scope.items is an array of objects from localStorage
    $scope.items = CartFactory.getCart();

    // $scope.removeItem = function (index){
    //     $scope.items.splice(index, 1);
    // };

    // $scope.clearCart = function () {
    //     CartFactory.clearAllinCart().then(function () {
    //         return;
    //     })
    // };

    // $scope.editItem = function (index, quantity){
    //     $scope.items.blends[index].quantity = quantity;
    // };

//use reduce
    // $scope.total = function() {
    //     var total = 0;
    //     angular.forEach($scope.items.blends, function(blend) {
    //         total += blend.quantity * blend.price;
    //     })
    //     return total;
    // };

    // $scope.checkout = function(order) {
    //     OrdersFactory.createOrder(order)
    //     .then(function () {
    //         $state.go('checkout');
    //     });
    // };
});