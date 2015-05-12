var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	mix.less('app.less', 'assets/css');

	mix.copy('vendor/bower_components/jquery/dist/jquery.min.js', 'resources/assets/js/vendor/jquery.js');
	mix.copy('vendor/bower_components/angular/angular.min.js', 'resources/assets/js/vendor/angular.js');
	mix.copy('vendor/bower_components/angularLocalStorage/src/angularLocalStorage.js', 'resources/assets/js/vendor/angularLocalStorage.js');
	mix.copy('vendor/bower_components/angular-resource/angular-resource.js', 'resources/assets/js/vendor/angular-resource.js');
	mix.copy('vendor/bower_components/angular-cookies/angular-cookies.min.js', 'resources/assets/js/vendor/angular-cookies.js');
	mix.copy('vendor/bower_components/angular-loading-bar/src/loading-bar.js', 'resources/assets/js/vendor/loading-bar.js');
	mix.copy('vendor/bower_components/angular-route/angular-route.min.js', 'resources/assets/js/vendor/angular-route.js');
	mix.copy('vendor/bower_components/angular-ui-router/release/angular-ui-router.js', 'resources/assets/js/vendor/angular-ui-router.js');
	mix.copy('vendor/bower_components/angular-http-auth/src/http-auth-interceptor.js', 'resources/assets/js/vendor/angular-http-auth.js');

	mix.copy('vendor/bower_components/angular-loading-bar/src/loading-bar.css', 'resources/assets/css/vendor/loading-bar.css');

	mix.scripts([
        "vendor/jquery.js",
        "vendor/angular.js",
        "vendor/angular-resource.js",
        "vendor/angularLocalStorage.js",
        "vendor/angular-cookies.js",
        "vendor/loading-bar.js",
        "vendor/angular-route.js",
        "vendor/angular-ui-router.js",
        "vendor/angular-http-auth.js",
    ], "public/assets/js", 'resources/assets/js');

    mix.version(['assets/css/app.css','assets/js/all.js'])
});

