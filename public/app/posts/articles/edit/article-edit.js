angular.module('articles.edit', ['textAngular', 'pickadate'])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.edit', {
				url: '/articles/:articleId/edit',
				views: {
					'forms@': {
						controller: 'EditArticleController as editArtCtrl',
						templateUrl: 'app/posts/articles/edit/article-edit.tmpl.html'
					},
				}
			})
		})
		.controller('EditArticleController', function editArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope) {
			var edit = this,
				article,
				newComment,
				postingComment = false;

			edit.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			edit.getArticle  = function(refresh) {
				if(refresh) {
					ArticlesModel.getArticleById($stateParams.articleId, refresh).then(function(result) {
						edit.article = result;
					});
				} else {
					ArticlesModel.getArticleById($stateParams.articleId).then(function(result) {
						edit.article = result;
						console.log(result.group);
					});
				}
			}
			edit.getArticle();

			edit.clearForm = function() {

			}

		})
;