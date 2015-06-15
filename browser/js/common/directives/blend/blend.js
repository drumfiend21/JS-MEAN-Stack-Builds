app.directive('blend', function (BlendsFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/blend/blend.html',
        scope: {
            blend: '='
        },
        link: function (scope) {
<<<<<<< HEAD
          addToCart = function() {
            console.log('hit add to cart')
          }
=======
        	scope.logThisItem = function(item){
        		console.log(item);
        	};
>>>>>>> master
        }

    };

});