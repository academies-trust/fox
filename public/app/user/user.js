angular.module('user', [
	'fox.models.user',
	'user.login',
	'user.profile',
])
	.controller('UserController', function UserController ()  {
		user = this;

		user.getGroups = function(permission) {
			userModel.getGroups(permission);
		}
	})
;