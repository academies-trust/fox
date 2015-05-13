angular.module('fox.models.articles', [

])
	.service('ArticlesModel', function EventsModel($http, API_URL){
		var model = this;
		
		model.getArticles = function() {
            return $http.get(API_URL + '/articles');
        }
        model.createArticle = function(client, title, description) {
        	return $http.post(API_URL + '/articles', {title: title, description: description});
        }
	})
;