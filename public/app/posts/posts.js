angular.module('posts', [
	'articles',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('fox.posts', {
				url: '/',
				views: {
					'posts@': {
						controller: 'PostsCtrl as ArtCtrl',
						templateUrl: 'app/posts/articles/list/article-list.tmpl.html',
					},
				}
			})
	})
	.controller('PostsCtrl', function PostsCtrl($stateParams, ArticlesModel) {
		var PostsCtrl = this;
		PostsCtrl.getArticles = function() {
			ArticlesModel.getArticles().then(function(res) {
				PostsCtrl.articles = res.data.data;
			});
		}
		PostsCtrl.getArticles();
	})

;