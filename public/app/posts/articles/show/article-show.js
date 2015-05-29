angular.module('articles.show', ['textAngular'])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.articles.show', {
				url: '/:articleId/show',
				views: {
					'posts@': {
						controller: 'ShowArticleController as showArtCtrl',
						templateUrl: 'app/posts/articles/show/article-show.tmpl.html'
					},
					'actions@': {
						controller: 'ShowArticleController as showArtCtrl',
						templateUrl: 'app/posts/articles/show/article-show-actions.tmpl.html'
					}
				},
				resolve: {
                    articles: function(ArticlesModel, $stateParams) {
                        return ArticlesModel.getArticleById($stateParams.articleId);
                    }
                }
			})
	})
	.controller('ShowArticleController', function ShowArticleController($stateParams, UserModel, ArticlesModel, $state, articles) {
		console.log(articles);
		var show = this;
		show.article = articles;
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