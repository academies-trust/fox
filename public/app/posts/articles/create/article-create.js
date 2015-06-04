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
				}
			})
		})
		.controller('CreateArticleController', function createArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope) {
			var create = this;
			create.article = {
				group: null,
				title: null,
				content: null,
				published: null,
				comments: null,
				help: null
			};

			create.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			create.create = function(article) {
				console.log(create.article);
	            ArticlesModel.createArticle(create.article)
				.then(function(result) {
					$state.go('^', {}, { reload: true });
				});
	        }
		})
;