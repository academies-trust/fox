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
    .constant('API_URL', 'http://api.thefoxhub.com')
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
        fox.clearErrors = function() {
            fox.errors = [];
        }
        $rootScope.$on('event:APIerror', function(error, data) {
            fox.errors.push(data);
        })
        $rootScope.$on('event:auth-loginRequired', function() {
            $('#appLoading').show();
            fox.authenticated = false;
            $('#login').css('opacity', 0)
              .slideDown('slow')
              .animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
              );
        })
        $rootScope.$on('event:auth-loginConfirmed', function() {
            fox.authenticated = true;
            $('#appLoading').fadeOut();
        })
        $rootScope.$on('event:newAPIcall', function() {
            fox.clearErrors();
        })
        $rootScope.$on('event:loading', function(event, message) {
            $('#requestLoading .message h1').text(message);
            $('#requestLoading').fadeIn();
        })
        $rootScope.$on('event:loadingComplete', function() {
            $('#requestLoading').fadeOut();
            $('#requestLoading .message h1').text('Loading');
        })
    })
    .controller('NavBarCtrl', function NavBarCtrl($scope) {
        $scope.isCollapsed = true;
    })
    .factory('TokenInterceptor', function TokenInterceptor(storage, $rootScope) {
        'use strict';
        return {
            request: addToken
        };

        function addToken(config) {
            var token = storage.get('token');
            $rootScope.$broadcast('event:newAPIcall');
            if(token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    })
;