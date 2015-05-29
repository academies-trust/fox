<!DOCTYPE html>
<html lang="en" ng-app="fox">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/"></base>
    <title>TheFoxHub</title>
    <link rel="stylesheet" href="{{ elixir('assets/css/app.css') }}">
    <link rel="stylesheet" href="{{ url('assets/css/vendor/textAngular.css') }}">
    <link rel="stylesheet" href="{{ url('assets/css/vendor/picker.css') }}">
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/fav/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/fav/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/fav/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/fav/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/fav/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/fav/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/fav/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/fav/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/fav/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/assets/images/fav/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/fav/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/fav/favicon-16x16.png">
    <link rel="manifest" href="/assets/images/fav/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/assets/images/fav/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body id="body" ng-controller="ApplicationController as AppCtrl">
    <div class="container-fluid" id="errors">
        <div class="row" ng-repeat="(index, error) in AppCtrl.errors">
            <div class="col-md-6 col-md-offset-3 alert-warning alert" role="alert">
                <button type="button" class="close" ng-click="AppCtrl.hideError([[index]])" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Error - [[error.data.error.code]] - [[error.data.error.http_code]]</strong>
                <p>[[error.data.error.message]]</p>
            </div>
        </div>
    </div>
    <div class="container-fluid" id="appLoading">
        <div class="message">
            <img src="{{url('assets/images/foxlogo.png')}}">
            <div id="login">
                <h1>Sign In</h1>
                <form ng-controller="AuthCtrl as Auth" ng-submit="Auth.login(credentials)">
                    <div class="form-group">
                        <label>Username or Email </label>
                        <input type="text" ng-model="credentials.username" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Password </label>
                        <input type="password" ng-model="credentials.password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    </div>
    <div class="container-fluid" id="requestLoading" ng-hide="AppCtrl.isAuthenticated()">
        <div class="message">
            <h1>Loading</h1>
        </div>
    </div>
    <div class="container-fluid" id="fixedNav">
        <div class="row" id="secondaryNav">
            <div class="container">
                <div class="row">
                    <nav class="actions text-center">
                        <ul ui-view="actions">
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="row" id="primaryNav">
            <div class="col-md-4 col-lg-3" id="currentGroup">
                <div ng-click="AppCtrl.toggleGroupSelect()">
                    <span class="glyphicon glyphicon-list" ng-hide="AppCtrl.groupSelect"></span> 
                    <span class="glyphicon glyphicon-remove" ng-show="AppCtrl.groupSelect"></span> 
                    <span ng-bind="AppCtrl.currentGroup.name"></span>
                </div>
                <nav class="groups" ng-show="AppCtrl.groupSelect">
                    <ul>
                        <li ng-click="AppCtrl.changeGroup('all')">All Groups</li>
                        <li ng-repeat="group in AppCtrl.getGroupsWhereCan('read')" ng-click="AppCtrl.changeGroup(group.id)">[[group.name]]</li>
                    </ul>
                </nav>
            </div>
            <div class="col-md-8 col-lg-9">
                <nav class="modules">
                    <ul>
                        <li ng-click="AppCtrl.changePost('everything')"><span class="glyphicon glyphicon-[[AppCtrl.getPostIcon('everything')]]"></span>everything</li>
                        <li ng-repeat="module in AppCtrl.getCurrentModules()" ng-class="{active: AppCtrl.isActive(module.name)}" ng-click="AppCtrl.changePost(module.name)"><span class="glyphicon glyphicon-[[AppCtrl.getPostIcon(module.name)]]"></span>[[module.name]]</li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div class="container-fluid" id="appContent">
        <div class="row">
            <nav class="navbar navbar-default" role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle" ng-click="navbarCollapsed = !navbarCollapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href ui-sref="fox.posts">
                    <img src="{{url('assets/images/foxlogo.png')}}">
                  </a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" collapse="navbarCollapsed">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href ui-sref="fox.posts" ng-if="AppCtrl.isAuthenticated()">Home</a></li>
                        <li><a ng-href="fox.user" ng-if="AppCtrl.isAuthenticated()">My Account</a></li>
                        <li><a href ng-controller="AuthCtrl as Auth" ng-click="Auth.logout()" ng-if="AppCtrl.isAuthenticated()">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="row">
            <div class="container" id="main" ng-if="AppCtrl.isAuthenticated()">
                <div class="row">
                    <div class="col-md-12" ui-view="forms">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" ui-view="posts">
                    </div>
                </div>
            </div>   
            <div class="footer">
            </div>
        </div>
    </div>

    <script src="{{ elixir('assets/js/all.js')}}"></script>
    <script src="{{ url('/app/fox.start.js') }}"></script>
    <script src="{{ url('/app/posts/posts.js') }}"></script>
    <script src="{{ url('/app/posts/articles/articles.js') }}"></script>
    <script src="{{ url('/app/posts/articles/show/article-show.js') }}"></script>
    <script src="{{ url('/app/posts/articles/list/article-list.js') }}"></script>
    <script src="{{ url('/app/posts/articles/create/article-create.js') }}"></script>
    <script src="{{ url('/app/posts/articles/edit/article-edit.js') }}"></script>
    <script src="{{ url('/app/common/models/articles-model.js') }}"></script>
    <script src="{{ url('/app/user/user.js') }}"></script>
    <script src="{{ url('/app/groups/groups.js') }}"></script>
    <script src="{{ url('/app/user/profile/user-profile.js') }}"></script>
    <script src="{{ url('/app/user/login/user-login.js') }}"></script>
    <script src="{{ url('/app/common/models/user-model.js') }}"></script>
    <script src="{{ url('/app/common/models/groups-model.js') }}"></script>

</body>
</html>