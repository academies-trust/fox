angular.module('articles', [
	'fox.models.articles',
	'fox.models.user',
	'articles.show',
	'articles.list',
	'articles.edit',
	'articles.create'
])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles', {
				url: '/articles',
				views: {
					'posts@': {
						controller: 'ArticlesController',
						templateUrl: 'app/posts/articles/list/article-list.tmpl.html'
					},
				}
			})
	})
	.controller('ArticlesController', function ArticlesController($stateParams, EventsModel, UserModel) {
		var ArticlesCtrl = this;

		EventsModel.getEvents()
			.then(function(result) {
				ArticlesCtrl.events = result.data;
				console.log(result);
			});

		ArticlesCtrl.create = function(client, title, description) {
            EventsModel.createEvent(client, title, description)
			.then(function(result) {
				ArticlesCtrl.events = result.data;
				console.log(result);
			});
        }
	})

;