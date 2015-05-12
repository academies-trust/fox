angular.module('fox.models.user', ['http-auth-interceptor'])

	.service('UserModel', function UserModel($http, API_URL, storage, authService){
		var model = this;
		
		model.getUser = function() {
            return $http.get(API_URL + '/token?include=groupUsers.group,groupUsers.permission')
            			.then(function (res) {
            				console.log(res.data);
            				storage.set('user', {
            					id: res.data.data.id,
            					name: res.data.data.name,
            					groups: res.data.data.GroupUsers
            				});
            			});
        }

        // TDB parse groups

        model.login = function(username, password) {
            return $http.post(API_URL + '/token', {
                username: username,
                password: password
            }).then(function (res) {
            	console.log(res.data.data.token);
            	storage.set('token', res.data.data.token);
            	authService.loginConfirmed();
            	model.getUser();
            });
        };

        model.logout = function() {
        	storage.remove('user');
        	storage.remove('token');
        }

        model.isAuthorized = function() {
        }

        model.isAuthenticated = function() {
        	return (storage.get('token') !== null);
        }
	})

;