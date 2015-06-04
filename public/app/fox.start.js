angular.module('fox', [
    'ui.router',
    'angularLocalStorage',
    'http-auth-interceptor',
    'textAngular',
    'posts',
    'user',
    'groups',
    'pickadate',
    'ui.bootstrap',
    'sticky',
], function config($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
})
    .constant('API_URL', 'http://api.thefoxhub.com')
    //.constant('API_URL', 'http://api.fox.dev')
    .config(function($interpolateProvider, $stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.html5Mode(true).hashPrefix('!');
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
        $stateProvider
            .state('fox', {
                url: '/:groupId',
                abstract: true,
                controller: 'ApplicationController as AppCtrl',
                resolve: {
                    groupId: function($stateParams, GroupsModel){
                        return GroupsModel.setGroup($stateParams.groupId).id;
                    }
                }
            });
            $urlRouterProvider.otherwise('/');
    })
    .controller('ApplicationController', function ApplicationController($scope, storage, UserModel, $rootScope, $state, GroupsModel, $stateParams, $location) {
        'use strict';
        var fox = this,
            authenticated = false;
        fox.errors = [];
        fox.currentGroup;
        fox.currentModule = $location.url().split('/')[2];
        fox.groupSelect = false;
        $scope.currentUser = null;

        UserModel.getUser().then(function(result) {
            $scope.currentUser = result;
            fox.getGroup();
        });

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
        fox.setGroup = function(groupId) {
            fox.currentGroup = GroupsModel.setGroup(groupId);
            return fox.currentGroup;
        }

        fox.setGroup($stateParams.groupId);

        fox.getGroup = function() {
            fox.currentGroup = GroupsModel.getGroup();
            return fox.currentGroup;
        }

        fox.getGroupUrl = function() {
            return (fox.currentGroup.id || 'all');
        }

        fox.toggleGroupSelect = function() {
            fox.groupSelect = (fox.groupSelect) ? false : true;
        }

        fox.getGroupsWhereCan = function(permission)  {
            return UserModel.getGroupsWhereCan(permission);
        }

        fox.userCan = function(permission, groupId) {
            return UserModel.userCan(permission, groupId);
        }

        fox.userOwns = function(resource) {
            return (resource.user.id === $scope.currentUser.id);
        }

        fox.changeGroup = function(groupId) {
            fox.setGroup(groupId);
            $state.go('fox.everything',{ groupId: groupId });
            fox.groupSelect = false;
        }

        fox.getCurrentModules = function() {
            return GroupsModel.getCurrentModules();
        }

        fox.changePost = function(post) {
            fox.currentModule = post;
            group = fox.currentGroup.id;
            $state.go('fox.'+post, {groupId: group});
        }

        fox.isActive = function(post) {
            return (fox.currentModule === post);
        }

        fox.getPostIcon = function(post) {
            switch(post) {
                case 'everything':
                    return 'th';
                    break;
                case 'articles':
                    return 'align-left';
                    break;
                case 'events':
                    return 'calendar';
                    break;
                case 'notices':
                    return 'bullhorn';
                    break;
                case 'resources':
                    return 'folder-open';
                    break;
                case 'tasks':
                    return 'tasks';
                    break;
                default:
                    return false;
            }
        }
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        fox.checkBodyMargin = debounce(function() {
            $('#appContent').css('margin-bottom', $('#actionsNav').height());
        },250);
        fox.setActionRowHeight = debounce(function() {
            $('#fixedNavRow').css('min-height', $('#fixedNav').height());
        })

        $rootScope.$on('$stateChangeSuccess', function() {
            fox.checkBodyMargin();
            fox.setActionRowHeight();
        });

        $(window).resize(function() {
            fox.checkBodyMargin();
        });

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
    .run([
        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            // Attach state variables to rootScope so we can access them
            // in controllers.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                throw error;
            });
        }
    ]);
;