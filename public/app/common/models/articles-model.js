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
				published: new Date(article.published.date),
			}
		}
		model.getArticles = function() {
			return $http.get(API_URL + '/articles').then(function(res) {
				model.articles = [];
				$.each(res.data.data, function(index, article) {
					model.articles.push(model.articlesTransformer(article));
				});
			});
        }
        model.createArticle = function(article) {
        	publishedD = new Date(article.published);
        	console.log(publishedD);
        	return $http.post(API_URL + '/groups/'+article.group+'/articles', {
        		title: article.title,
        		content: article.content,
        		comments: article.comments,
        		help: article.help,
        		published: publishedD.getFullYear()+'-'+('0'+(publishedD.getMonth()+1)).slice(-2)+'-'+('0'+publishedD.getDate()).slice(-2),
        	});
        }
	})
;