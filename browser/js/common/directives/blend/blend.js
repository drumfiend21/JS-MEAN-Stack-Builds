app.directive('blend', function (BlendsFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/blend/blend.html',
        scope: {
            blend: '='
        },
        link: function (scope) {
        	scope.logThisItem = function(item){
        		console.log(item);
        	};
        }

    };

});