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
                  <a class="navbar-brand" href="#">
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
            <div class="container-fluid" id="main" ng-if="AppCtrl.isAuthenticated()">
                <div class="row">
                    <div class="col-md-12" ui-view="forms">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3" ui-view="groups">
                    </div>
                    <div class="col-md-9" ui-view="posts">
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
    <script src="{{ url('/app/user/profile/user-profile.js') }}"></script>
    <script src="{{ url('/app/user/login/user-login.js') }}"></script>
    <script src="{{ url('/app/common/models/user-model.js') }}"></script>
</body>
</html>