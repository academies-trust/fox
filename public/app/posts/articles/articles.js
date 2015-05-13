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
						controller: 'ArticlesController as ArtCtrl',
						templateUrl: 'app/posts/articles/list/article-list.tmpl.html'
					},
				}
			})
	})
	.controller('ArticlesController', function ArticlesController($stateParams, ArticlesModel, UserModel) {
		var ArticlesCtrl = this;
		ArticlesCtrl.getArticles = function() {
			ArticlesModel.getArticles().then(function(res) {
				ArticlesCtrl.articles = res.data.data;
			});
		}
		ArticlesCtrl.getArticles();
	})

;