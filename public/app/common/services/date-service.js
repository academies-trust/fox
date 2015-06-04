angular.module('fox.services.dates', [

])
	.service('DateService', function DateService(){
		var service = this;
		service.createDate = function(date) {
			date = date.toString().replace(/(.+) (.+)/, "$1T$2Z");
			return new Date(date);
		}
	})
;