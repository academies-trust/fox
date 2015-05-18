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
		.controller('ShowArticleController', function showArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state) {
			var show = this,
				article;

			show.getArticle  = function() {
				console.log($stateParams.articleId);
				ArticlesModel.getArticleById($stateParams.articleId).then(function(result) {
					show.article = result;
				});
			}
			show.getArticle();
			show.addComment = function(comment) {
				ArticlesModel.addComment(show.article, comment).then(function(res) {
					console.log(res);
				});
			}

		})
;