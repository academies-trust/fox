angular.module('user.login', [])
	.controller('AuthCtrl', function AuthCtrl($stateParams, UserModel, $scope, $rootScope, authService) {
		var auth = this;

		auth.login = function(credentials) {
            user = UserModel.login(credentials.username, credentials.password).then(function success(response) {
            	$scope.setCurrentUser(user);
            }, function() {
            	// failed
            });
        }

        auth.logout = function() {
        	UserModel.logout();
        }

        auth.getUser = function(){
            UserModel.getUser().then(function success(response) {
            }, fox.handleError);
        }
	})
;