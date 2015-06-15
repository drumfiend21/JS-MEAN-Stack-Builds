// app.directive('manageUser', function (UserFactory){
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'js/common/directives/manage-user/user',
// 		link: function (scope) {
// 			UserFactory.getUserByEmail().then(function (user) {
// 				return scope.user;
// 			})
// 		}
// 	}
// })