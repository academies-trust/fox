angular.module('fox.models.groups', [

])
	.service('GroupsModel', function GroupsModel($http, API_URL, $q, $filter, UserModel, $rootScope){
		var model = this,
			groups;
		model.groupId;
		model.currentGroup = {};

		model.setGroup = function(groupId) {
			if(groupId !== null && !isNaN(groupId)) {
				model.groupId = groupId;
				group = UserModel.hasGroup(groupId)[0];
				if(group) {
					model.currentGroup = {
						name: group.name,
						id: group.id,
						modules: group.modules,
					}
				}
			} else {
				model.groupId = null;
				model.currentGroup = {
					name: 'All Groups',
					id: null,
					//modules: UserModel.getAccessibleModules();
				}
			}
			return model.currentGroup;
		}

		model.getGroup = function() {
			return model.setGroup(model.groupId);
		}

		model.getGroupId = function() {
			return model.groupId;
		}

		model.getCurrentModules = function() {
			return model.currentGroup.modules;
		}
	})
;