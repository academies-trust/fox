angular.module('fox.models.user', ['http-auth-interceptor'])

	.service('UserModel', function UserModel($http, API_URL, storage, authService, filterFilter, $rootScope){
		var model = this;
		model.groups = [];
        model.user = [];
		
		model.getUser = function() {
            return $http.get(API_URL + '/token?include=groupUsers.group.modules,groupUsers.permission')
            			.then(function (res) {
            				model.user = {
            					id: res.data.data.id,
                                name: res.data.data.name,
            				};
            				model.setGroups(res.data.data.groupUsers);
                            authService.loginConfirmed();
                            return model.user;
            			});
        }

        model.groupTransformer = function(group) {
        	return {
    			id: group.group.data.id,
				name: group.group.data.name,
				role: group.permission.data.name,
				read: group.permission.data.read,
				contribute: group.permission.data.contribute,
				write: group.permission.data.write,
				admin: group.permission.data.admin,
				own: group.permission.data.own,
                modules: group.group.data.modules.data,
        	}
        }

        model.setGroups = function(groupUsers) {
        	model.groups = [];
        	$.each(groupUsers.data, function(index, groupUser)
        	{
        		model.groups.push(model.groupTransformer(groupUser));
        	});
        }

        model.login = function(username, password) {
            return $http({
                method: 'POST',
                url: API_URL + '/token',
                data: {
                    username: username,
                    password: password
                },
                ignoreAuthModule: true,
            }).then(function (res) {
                storage.set('token', res.data.data.token);
                model.getUser();
                $rootScope.$broadcast('event:loadingComplete')
            }, function(error){
                if(error.data.error) {
                    $rootScope.$broadcast('event:APIerror', error);
                    $rootScope.$broadcast('event:loadingComplete');
                }
            });
        };

        model.logout = function() {
        	storage.remove('token');
            $rootScope.$broadcast('event:auth-loginRequired');
        }

        model.isAuthenticated = function() {
        	return (storage.get('token') !== null);
        }
        model.getGroupsWhereCan = function(permission) {
			switch(permission) {
					case 'write':
						groups = filterFilter(model.groups, {write: true});
					break;
					case 'read':
						groups = filterFilter(model.groups, {read: true});
					break;
					case 'contribute':
						groups = filterFilter(model.groups, {contribute: true});
					break;
					case 'own':
						groups = filterFilter(model.groups, {own: true});
					break;
					case 'admin':
						groups = filterFilter(model.groups, {admin: true});
					break;
				}
            if(groups) {
                return groups;
            } else {
                return false;
            }
		}
        model.userCan = function(permission, groupId) {
            group = _.find(model.groups, function(group) {
                return group.id === parseInt(groupId, 10);
            });
            return (group[permission] === true);
        }
        model.hasGroup = function(groupId) {
            group = filterFilter(model.groups, {id: groupId});
            if(group.length === 1) {
                return group;
            } else {
                return false;
            }
        }
	})

;