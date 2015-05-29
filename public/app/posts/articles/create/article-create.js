angular.module('articles.create', ['textAngular', 'pickadate'])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.create', {
				url: '/create',
				views: {
					'forms@': {
						controller: 'CreateArticleController as createArtCtrl',
						templateUrl: 'app/posts/articles/create/article-create.tmpl.html'
					},
					'posts@': {

					},
					'actions@': {
						controller: 'CreateArticleController as createArtCtrl',
						templateUrl: 'app/posts/articles/create/article-create-actions.tmpl.html'
					}
				}
			})
		})
		.controller('CreateArticleController', function createArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state) {
			create = this;

			create.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			create.create = function(article) {
	            ArticlesModel.createArticle(article)
				.then(function(result) {
					$state.go('^', {}, { reload: true });
				});
	        }


		})
;