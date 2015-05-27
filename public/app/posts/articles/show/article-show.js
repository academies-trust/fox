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
				},
				resolve: {
                    article: function(ArticlesModel, $stateParams) {
                        return ArticlesModel.getArticleById($stateParams.articleId, true);
                    }
                }
			})
	})
	.controller('ShowArticleController', function showArticleController($stateParams, UserModel, ArticlesModel, filterFilter, $state, $scope, article) {
		var show = this;
		show.article = article;
		var newComment,
			postingComment = false;

		show.addComment = function() {
			show.postingComment = true;
			show.taDisabled = true;
			ArticlesModel.addComment(show.article, show.newComment).then(function(res) {
				show.newComment = '';
				$state.go('fox.articles.show', {articleId: show.article.id}, {reload: true});
			}).finally(function() {
				show.postingComment = false;
			});
		}

	})
;