angular.module('articles.edit', ['textAngular', 'pickadate'])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.edit', {
				url: '/:articleId/edit',
				views: {
					'forms@': {
						controller: 'EditArticleController as editArtCtrl',
						templateUrl: 'app/posts/articles/edit/article-edit.tmpl.html'
					},
					'posts@' : {

					},
					'actions@': {
						controller: 'EditArticleController as editArtCtrl',
						templateUrl: 'app/posts/articles/edit/article-edit-actions.tmpl.html'
					}
				},
				resolve: {
                    article: function(ArticlesModel, $stateParams) {
                        return ArticlesModel.getArticleById($stateParams.articleId, true);
                    }
                }
			})
		})
		.controller('EditArticleController', function editArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope, $filter, article) {
			var edit = this;
			edit.article = article;
			$scope.revisionSelect = parseInt(edit.article.content_id, 10);
			edit.currentRevision = article;

			edit.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			edit.selectRevision = function(id) {
				revision = $filter('filter')(edit.article.revisions, {id: id})[0];
				edit.currentRevision = revision;
			}

			edit.edit = function(article) {
	            ArticlesModel.editArticle(article)
				.then(function(result) {
					$state.go('fox.articles.show', {articleId: article.id});
				});
	        }

	        edit.changeRevision = function() {
	        	ArticlesModel.changeRevision(edit.article,edit.currentRevision.id)
	        	.then(function(result) {
	        		$state.go('fox.articles.show', {articleId: edit.article.id});
	        	});
	        }

			edit.clearForm = function() {

			}

		})
;