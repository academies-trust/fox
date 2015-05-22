angular.module('fox.models.articles', [

])
	.service('ArticlesModel', function ArticlesModel($http, API_URL, $q){
		var model = this,
			articles;
		model.articleTransformer = function(article) {
			approved_by = (article.activeContent.data.approved_by) ? {
						id: article.activeContent.data.approvedBy.data.id,
						name: article.activeContent.data.approvedBy.data.name,
						email: article.activeContent.data.approvedBy.data.email,
					} : null;
			return {
				id: article.id,
				comments_enabled: article.comments_enabled,
				help: article.help,
				title: article.activeContent.data.title,
				content: article.activeContent.data.content,
				content_id: article.content,
				revisions: model.revisionsTransformer(article.revisions.data),
				approved: new Date(article.activeContent.data.approved.date),
				approved_by: approved_by,
				updated: new Date(article.activeContent.data.updated.date),
				published: new Date(article.published.date),
				group: article.group,
				user: {
					name: article.activeContent.data.user.data.name,
					id: article.activeContent.data.user.data.id,
					email: article.activeContent.data.user.data.email,
				},
				comments: model.commentsTransformer(article.comments.data),
			}
		}
		model.commentsTransformer = function (comments) {
			var transformedComments = [];
			$.each(comments, function(index, comment) {
				transformedComments.push(model.commentTransformer(comment));
			});
			return transformedComments;
		}
		model.commentTransformer = function (comment) {
			return {
				id: comment.id,
				content: comment.content,
				created: new Date(comment.created.date),
				//published: new Date(comment.published.date),
				updated: new Date(comment.updated.date),
				user: {
					name: comment.user.data.name,
					id: comment.user.data.id,
					email: comment.user.data.email,
				},
			}
		}
		model.revisionsTransformer = function(revisions) {
			var transformedRevisions = [];
			$.each(revisions, function(index, revision) {
				transformedRevisions.push(model.revisionTransformer(revision));
			});
			return transformedRevisions;
		}
		model.revisionTransformer = function (revision) {
			approved_by = (revision.approved_by) ? {
						id: revision.approvedBy.data.id,
						name: revision.approvedBy.data.name,
						email: revision.approvedBy.data.email,
					} : null;
			return {
				id: revision.id,
				content: revision.content,
				title: revision.title,
				approved: new Date(revision.approved.date),
				approved_by: approved_by,
				created: new Date(revision.created.date),
				//published: new Date(revision.published.date),
				updated: new Date(revision.updated.date),
				user: {
					name: revision.user.data.name,
					id: revision.user.data.id,
					email: revision.user.data.email,
				},
			}
		}
		function extract(result) {
			return result.data.data.map(function(article) {
				return model.articleTransformer(article)
			});
		}
		function cacheArticles(result) {
			articles = extract(result);
			return articles;
		}
		model.getArticles = function(refresh) {
			return (articles && !refresh) ? $q.when(articles) : $http.get(API_URL + '/articles?include=activeContent.user,activeContent.approvedBy,revisions.user,revisions.approvedBy,comments.user').then(cacheArticles);
        }
        function findArticle(articleId) {
        	return _.find(articles, function(article) {
        		return article.id === parseInt(articleId, 10);
        	})
        }
        model.getArticleById = function(articleId, refresh) {
        	var deferred = $q.defer();
        	if(articles && !refresh) {
        		deferred.resolve(findArticle(articleId));
        	} else {
    			model.getArticles('refresh').then(function() {
    				deferred.resolve(findArticle(articleId));
    			});
        	}
        	return deferred.promise;
        }
        model.createArticle = function(article) {
        	publishedD = new Date(article.published);
        	return $http.post(API_URL + '/groups/'+article.group+'/articles', {
        		title: article.title,
        		content: article.content,
        		comments: article.comments,
        		help: article.help,
        		published: publishedD.getFullYear()+'-'+('0'+(publishedD.getMonth()+1)).slice(-2)+'-'+('0'+publishedD.getDate()).slice(-2),
        	});
        }
        model.editArticle = function(article) {
        	publishedD = new Date(article.published);
        	return $http.post(API_URL + '/articles/'+article.id, {
        		_method: 'PATCH',
        		title: article.title,
        		content: article.content,
        		comments: article.comments_enabled,
        		help: article.help,
        		published: publishedD.getFullYear()+'-'+('0'+(publishedD.getMonth()+1)).slice(-2)+'-'+('0'+publishedD.getDate()).slice(-2),
        		reason: article.reason,
        	});
        }
        model.addComment = function(article, comment) {
        	return $http.post(API_URL+'/articles/'+article.id+'/comments', {
        		content: comment
        	}).then(function(res) {
        		return model.getArticleById(res.data.data);
        	}).catch(function(error) {
        		return false;
        	});
        }
        model.changeRevision = function(article, revisionId) {
			return $http.post(API_URL + '/articles/'+article.id, {
				_method: 'PATCH',
				revision: revisionId,
			});
		}
	})
;