angular.module('fox.models.articles', [

])
	.service('ArticlesModel', function EventsModel($http, API_URL){
		var model = this;
		
		model.getArticles = function() {
            return $http.get(API_URL + '/articles');
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