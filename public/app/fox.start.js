angular.module('fox', [
    'ui.router',
    'angularLocalStorage',
    'http-auth-interceptor',
    'textAngular',
    'posts',
    'user',
    'pickadate',
    'ui.bootstrap',
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
        var fox = this,
            authenticated = false;

        fox.errors = [];
        $scope.currentUser = null;

        UserModel.getUser();

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
          };


        fox.isAuthenticated = function() {
            return fox.authenticated;
        }

        fox.handleError = function(response) {
            alert('Error ' + response.data.error.http_code + ' - ' + response.data.error.message + ' (' + response.data.error.code + ')');
        }
        fox.hideError = function(index) {
            fox.errors.splice(index, 1);
        }
        $rootScope.$on('event:APIerror', function(error, data) {
            fox.errors.push(data);
        })
        $rootScope.$on('event:auth-loginRequired', function() {
            fox.authenticated = false;
            $('body').css('opacity', '1');
        })
        $rootScope.$on('event:auth-loginConfirmed', function() {
            fox.authenticated = true;
            $('body').css('opacity', '1');
        })
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
;