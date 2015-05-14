angular.module('fox.models.articles', [

])
	.service('ArticlesModel', function ArticlesModel($http, API_URL){
		var model = this;
		model.articles = [];
		model.articlesTransformer = function(article) {
			return {
				id: article.id,
				comments_enabled: article.comments_enabled,
				help: article.help,
				title: article.activeContent.data.title,
				content: article.activeContent.data.content,
				approved: new Date(article.activeContent.data.approved.date),
				updated: new Date(article.activeContent.data.updated.date),
			}
		}
		model.getArticles = function() {
			return $http.get(API_URL + '/articles').then(function(res) {
				model.articles = [];
				$.each(res.data.data, function(index, article) {
					model.articles.push(model.articlesTransformer(article));
					console.log(model.articlesTransformer(article));
				});
			});
        }
        model.createArticle = function(article) {
        	return $http.post(API_URL + '/groups/'+article.group+'/articles', {
        		title: article.title,
        		content: article.content,
        		comments: article.comments,
        		help: article.help,
        		published: article.published,
        	});
        }
	})
;