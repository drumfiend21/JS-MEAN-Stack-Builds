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
        console.log("order is ", order)
        if(AuthService.isAuthenticated()) {

                var formattedObj = order.map(
                    function(obj){
                        console.log('the obj:', obj)
                        return {typeofblend: obj._id, quantity: obj.quantity, name: obj.name};
                    }
                );
                console.log('the formattedObj', formattedObj);
                order = formattedObj;
            

        var toSubmit = {blend: order, status: "created"}
        console.log('toSubmit', toSubmit);

        OrdersFactory.createOrder(toSubmit)
        .then(function (order) {
            console.log("SUCCESSS ", order)
            $state.go('orders');
        })
        } else {
            $state.go('login');
        }
    };
});