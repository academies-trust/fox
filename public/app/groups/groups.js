angular.module('groups', ['fox.models.groups'])
	.controller('GroupController', function GroupController (UserModel, $state)  {
		group = this;
		group.select = false;
	})
;