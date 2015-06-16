app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, AuthService, CartFactory, OrdersFactory, $state) {
    $scope.logThis = function(something){
        console.log(something);
    }
    //$scope.items is an array of objects from localStorage
    $scope.items = CartFactory.getCart();

    $scope.removeItem = function (index){
        CartFactory.deleteItem($scope.items[index].name)
        $scope.items.splice(index, 1);
    };

    $scope.clearCart = function () {
        console.log('hello cart')
        CartFactory.clearAllinCart()
        $scope.items = CartFactory.getCart();
        
    };

// use reduce
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.items, function(blend) {
            total += blend.quantity * blend.price;
        })
        return total;
    };


    $scope.checkout = function(order) {
        if(AuthService.isAuthenticated()) {
            OrdersFactory.createOrder(order)
            .then(function () {
                $state.go('orders');
            })
        } else {
            $state.go('login');
        }
    };
});