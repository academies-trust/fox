angular.module('everything', [
	'fox.models.posts',
	'fox.models.user',
	'everything.list',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.everything', {
				url: '/everything',
				views: {
					'posts@': {
						controller: 'PostsController as PostCtrl',
						templateUrl: 'app/posts/everything/list/everything-list.tmpl.html'
					},
					'actions@': {
						
					}
				},
				
			})
	})
	.controller('PostsController', function PostsController($stateParams, UserModel) {
		var PostsCtrl = this;
	})

;