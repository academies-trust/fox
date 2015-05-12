angular.module('posts', [
	'articles',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.posts', {
				url: '/',
				views: {
					'posts@': {
						controller: 'PostsCtrl as PostsCtrl',
						templateUrl: 'app/posts/articles/list/article-list.tmpl.html',
					},
				}
			})
			.state('sb.eventsCreate', {
				url: '/events/create',
				views: {
					'events@': {
						controller: 'EventsCtrl as evm',
						templateUrl: 'app/events/create/event-create.tmpl.html'
					},
				}
			})
	})
	.controller('PostsCtrl', function PostsCtrl($stateParams, EventsModel) {
		var evm = this;
		evm.create = create;

		function create(client, title, description) {
            EventsModel.createEvent(client, title, description)
			.then(function(result) {
				evm.events = result.data;
				console.log(result);
			});
        }
	})

;