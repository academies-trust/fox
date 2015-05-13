angular.module('articles.create', [])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.create', {
				url: '/articles/create',
				views: {
					'forms@': {
						controller: 'CreateArticleController as createArtCtrl',
						templateUrl: 'app/posts/articles/create/article-create.tmpl.html'
					},
					'posts@' : {
						controller: 'ArticlesController',
						templateUrl: 'app/posts/articles/list/article-list.tmpl.html'
					}
				}
			})
		})
		.controller('CreateArticleController', function createArticleController($stateParams, UserModel, ArticlesModel, filterFilter) {
			create = this;

			create.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			create.create = function(article) {
	            ArticleModel.createArticle(article)
				.then(function(result) {
					// TBD sucess
				});
	        }
		})
;