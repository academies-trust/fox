angular.module('user', [
	'fox.models.user',
	'user.login',
	'user.profile',
])
	.controller('UserController', function UserController ()  {
		user = this;

		user.test = function() {
			alert('moo');
		}

	})
;