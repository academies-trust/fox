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
					'posts@' : {

					}
				}
			})
		})
		.controller('EditArticleController', function editArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope, $filter) {
			var edit = this,
				article,
				newComment,
				postingComment = false,
				revisionSelect,
				currentRevision;

			edit.getGroupsWhereCan = function(permission)	{
				return UserModel.getGroupsWhereCan(permission);
			}

			edit.getArticle  = function(refresh) {
				ArticlesModel.getArticleById($stateParams.articleId, 'refresh').then(function(result) {
					edit.article = result;
					edit.revisionSelect = result.content_id;
					edit.currentRevision = result;
				});
			}
			edit.selectRevision = function(id) {
				revision = $filter('filter')(edit.article.revisions, {id: id})[0];
				edit.currentRevision = revision;
			}
			edit.getArticle();

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