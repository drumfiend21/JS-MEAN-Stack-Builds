app.config(function ($stateProvider) {

    // Register our *orders* state.
    $stateProvider.state('orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/orders/orders.html'
    });

});

app.controller('OrdersController', function ($scope, OrdersFactory, BlendsFactory){

	$scope.showOrders = function () {
		OrdersFactory.getAllOrders().then(function (orders) {
			$scope.orders = orders;
		});
	};

	$scope.showOrdersById = function (orderid) {
		OrdersFactory.getOrderById(orderid).then(function (order) {
			$scope.order = order;
		});
	};

	$scope.addOrder = function (order) {

	};

	$scope.loadOrderToEdit = function (id) {
		OrdersFactory.getOrderById(id).then(function (order) {
			$scope.editedOrder = order;
		});
	};

	$scope.editOrder = function (id, order) {
		$scope.editOrderById(id, order).then(function (order) {
			$scope.editedOrder = order;
		});
	};
})