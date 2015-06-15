app.directive('blend', function (CartFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/blend/blend.html',
        scope: {
            blend: '='
        },
        link: function (scope) {
          scope.addToCart = function(blend) {
            CartFactory.saveCart(blend.name, blend);
            console.log('hit add to cart');
          };
        }
    };
});