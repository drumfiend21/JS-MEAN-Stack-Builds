app.directive('review', function (ReviewsFactory){
		return {
			restrict: 'E',
			templateUrl: 'js/common/directives/review/review.html',
      scope: {
          review: '=',
          blend: '='
      },
      link: function (scope) {
      	scope.isCollapsed = true;
      }
		};
});