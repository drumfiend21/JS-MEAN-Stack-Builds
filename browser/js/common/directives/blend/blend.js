app.directive('blend', function (BlendsFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/blend/blend.html',
        scope: {
            blend: '='
        },
        link: function (scope) {
        	scope.name = "jeff";
        	function logThisItem(item){
        		console.log(scope.name);
        	}
        }

    };

});