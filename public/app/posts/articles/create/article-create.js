angular.module('articles.create', [])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.create', {
				url: '/articles/create',
				views: {
					'posts@': {
						controller: 'ArticlesController',
						templateUrl: 'app/posts/articles/create/article-create.tmpl.html'
					},
				}
			})
	})
;