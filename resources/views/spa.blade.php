<!DOCTYPE html>
<html lang="en" ng-app="fox">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/"></base>
    <title>TheFoxHub</title>
    <link rel="stylesheet" href="{{ elixir('assets/css/app.css') }}">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body ng-controller="ApplicationController as AppCtrl" class="auth-interceptor waiting-for-angular">
    <div class="navbar" role="navigation" >
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#/">TheFoxHub</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a ui-sref="fox">Home</a></li>
                    <li><a ng-href="#/">My Account</a></li>
                    <li><a ng-href="#/signin">Signin</a></li>
                    <li><a ng-href="#/signup">Signup</a></li>
                    <li><a ng-controller="AuthCtrl as Auth" ng-click="Auth.logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container" id="login" ng-if="!AppCtrl.hasToken()">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
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
    <div class="container-fluid" ng-if="AppCtrl.hasToken()" id="main">
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
    <script src="{{ url('/app/controllers.js') }}"></script>
    <script src="{{ url('/app/services.js') }}"></script>
</body>
</html>