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
					'actions@': {
						controller: 'ArticlesController as ArtCtrl',
						templateUrl: 'app/posts/articles/list/article-list-actions.tmpl.html'
					}
				},
				resolve: {
                    articles: function(ArticlesModel, GroupsModel) {
                        return ArticlesModel.getArticles(GroupsModel.getGroupId(), true);
                    }
                }
			})
	})
	.controller('ArticlesController', function ArticlesController($stateParams, ArticlesModel, UserModel, articles) {
		var ArticlesCtrl = this;
		ArticlesCtrl.articles = articles;
	})

;