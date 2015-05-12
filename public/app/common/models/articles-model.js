angular.module('fox.models.articles', [

])
	.service('EventsModel', function EventsModel($http, API_URL){
		var model = this;
		
		model.getEvents = function() {
            return $http.get(API_URL + '/articles');
        }
        model.createEvent = function(client, title, description) {
        	return $http.post(API_URL + '/articles', {title: title, description: description});
        }
	})
;