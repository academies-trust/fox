angular.module('fox', [
    'ui.router',
    'angularLocalStorage',
    'http-auth-interceptor',
    'textAngular',
    'posts',
    'user',

], function config($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
})
    .constant('API_URL', 'http://api.fox.dev')
    .config(function($interpolateProvider, $stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.html5Mode(true).hashPrefix('!');
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
        $stateProvider
            .state('fox', {
                url: '',
                abstract: true
            });
            $urlRouterProvider.otherwise('/');
    })
    .controller('ApplicationController', function ApplicationController($scope, storage, UserModel, $rootScope) {
        'use strict';
        var fox = this;
        $scope.currentUser = null;

        UserModel.getUser();

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
          };


        fox.isAuthenticated = function() {
            return UserModel.isAuthenticated();
        }

        fox.handleError = function(response) {
            alert('Error ' + response.data.error.http_code + ' - ' + response.data.error.message + ' (' + response.data.error.code + ')');
            if(response.data.error.http_code == 401) {
                storage.remove('user');
            }
        }
    })
    .factory('TokenInterceptor', function TokenInterceptor(storage) {
        'use strict';
        return {
            request: addToken
        };

        function addToken(config) {
            var token = storage.get('token');
            if(token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    })
    .directive('authInterceptor', function() {
        return {
          restrict: 'C',
          link: function(scope, elem, attrs) {
            //once Angular is started, remove class:
            elem.removeClass('waiting-for-angular');
            
            var login = elem.find('#login');
            var main = elem.find('#main');
            
            login.hide();
            
            scope.$on('event:auth-loginRequired', function() {
              login.css('opacity', 0)
              .slideDown()
              .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
              );
                main.hide();
            });
            scope.$on('event:auth-loginConfirmed', function() {
                //
              main.show();
              login.slideUp();
            });
          }
        }
    })

;