angular.module('fox.models.articles', [

])
	.service('ArticlesModel', function ArticlesModel($http, API_URL, $q){
		var model = this,
			articles;
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
				user: {
					name: article.activeContent.data.user.data.name,
					id: article.activeContent.data.user.data.id,
					email: article.activeContent.data.user.data.email,
				}
			}
		}
		function extract(result) {
			return result.data.data.map(function(article) {
				return model.articlesTransformer(article)
			});
		}
		function cacheArticles(result) {
			articles = extract(result);
			return articles;
		}
		model.getArticles = function(refresh) {
			return (articles && !refresh) ? $q.when(articles) : $http.get(API_URL + '/articles?include=activeContent.user').then(cacheArticles);
        }
        model.findArticle = function(articleId) {
        	var deferred = $q.defer();

        	if(articles) {
        		deferred.resolve(/**/);
        	} else {
        		model.getArticles().then(function(result) {
					deferred.resolve();
				});
        	}

        	return deferred.promise;
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