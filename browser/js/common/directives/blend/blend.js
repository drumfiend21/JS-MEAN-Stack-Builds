app.directive('blend', function (CartFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/blend/blend.html',
        scope: {
            blend: '=',
            isNewBlendFormOpen: '=' 
        },
        link: function (scope) {
        	scope.quantity = 1; 
          scope.addToCart = function(blend, quantity) {
          	var blendWithQuantity = blend;
          	blendWithQuantity.quantity = quantity;
          	console.log("blend with quantity", blendWithQuantity); 
            CartFactory.saveCart(blend.name, blendWithQuantity);
          };
        }
    };
});