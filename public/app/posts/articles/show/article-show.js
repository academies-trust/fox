angular.module('articles.show', ['textAngular'])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.show', {
				url: '/articles/:articleId/show',
				views: {
					'posts@': {
						controller: 'ShowArticleController as showArtCtrl',
						templateUrl: 'app/posts/articles/show/article-show.tmpl.html'
					},
				}
			})
		})
		.controller('ShowArticleController', function showArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope) {
			var show = this,
				article,
				newComment,
				postingComment = false;

			show.getArticle  = function(refresh) {
				if(refresh) {
					ArticlesModel.getArticleById($stateParams.articleId, refresh).then(function(result) {
						show.article = result;
					});
				} else {
					ArticlesModel.getArticleById($stateParams.articleId).then(function(result) {
						show.article = result;
					});
				}
			}
			show.getArticle();
			show.addComment = function() {
				show.postingComment = true;
				show.taDisabled = true;
				ArticlesModel.addComment(show.article, show.newComment).then(function(res) {
					show.getArticle('refresh');
					show.newComment = '';
				}).finally(function() {
					show.postingComment = false;
				});
			}

			show.clearForm = function() {

			}

		})
;