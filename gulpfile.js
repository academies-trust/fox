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

	mix.copy('vendor/bower_components/jquery/dist/jquery.min.js', 'resources/assets/js/vendor/jquery.js');
	mix.copy('vendor/bower_components/angular/angular.min.js', 'resources/assets/js/vendor/angular.js');
	mix.copy('vendor/bower_components/angularLocalStorage/src/angularLocalStorage.js', 'resources/assets/js/vendor/angularLocalStorage.js');
	mix.copy('vendor/bower_components/angular-resource/angular-resource.js', 'resources/assets/js/vendor/angular-resource.js');
	mix.copy('vendor/bower_components/angular-cookies/angular-cookies.min.js', 'resources/assets/js/vendor/angular-cookies.js');
	mix.copy('vendor/bower_components/angular-loading-bar/src/loading-bar.js', 'resources/assets/js/vendor/loading-bar.js');
	mix.copy('vendor/bower_components/angular-route/angular-route.min.js', 'resources/assets/js/vendor/angular-route.js');
	mix.copy('vendor/bower_components/angular-ui-router/release/angular-ui-router.js', 'resources/assets/js/vendor/angular-ui-router.js');
	mix.copy('vendor/bower_components/angular-http-auth/src/http-auth-interceptor.js', 'resources/assets/js/vendor/angular-http-auth.js');
	mix.copy('vendor/bower_components/textAngular/dist/textAngular.min.js', 'resources/assets/js/vendor/textAngular.js');
	mix.copy('vendor/bower_components/textAngular/src/textAngular-sanitize.js', 'resources/assets/js/vendor/textAngular-sanitize.js');
	mix.copy('vendor/bower_components/textAngular/dist/textAngular-rangy.min.js', 'resources/assets/js/vendor/textAngular-rangy.js');
    mix.copy('vendor/bower_components/ng-pickadate/ng-pickadate.js', 'resources/assets/js/vendor/ng-pickadate.js');
    mix.copy('vendor/bower_components/pickadate/lib/picker.js', 'resources/assets/js/vendor/picker.js');
    mix.copy('vendor/bower_components/pickadate/lib/picker.date.js', 'resources/assets/js/vendor/picker.date.js');
    mix.copy('vendor/bower_components/pickadate/lib/picker.time.js', 'resources/assets/js/vendor/picker.time.js');
    mix.copy('vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js', 'resources/assets/js/vendor/bootstrap.js');
    mix.copy('vendor/bower_components/lodash/lodash.min.js', 'resources/assets/js/vendor/lodash.js');

	mix.copy('vendor/bower_components/angular-loading-bar/src/loading-bar.css', 'resources/assets/css/vendor/loading-bar.css');
	mix.copy('vendor/bower_components/textAngular/src/textAngular.css', 'public/assets/css/vendor/textAngular.css');
    mix.copy('vendor/bower_components/pickadate/lib/themes/default.css', 'public/assets/css/vendor/picker/default.css');
    mix.copy('vendor/bower_components/pickadate/lib/themes/default.date.css', 'public/assets/css/vendor/picker/default.date.css');
    mix.copy('vendor/bower_components/pickadate/lib/themes/default.time.css', 'public/assets/css/vendor/picker/default.time.css');
	mix.scripts([
        "vendor/jquery.js",
        "vendor/lodash.js",
        "vendor/angular.js",
        "vendor/angular-resource.js",
        "vendor/angularLocalStorage.js",
        "vendor/angular-cookies.js",
        "vendor/loading-bar.js",
        "vendor/angular-route.js",
        "vendor/angular-ui-router.js",
        "vendor/angular-http-auth.js",
        "vendor/textAngular.js",
        "vendor/textAngular-sanitize.js",
        "vendor/textAngular-rangy.js",
        "vendor/ng-pickadate.js",
        "vendor/picker.js",
        "vendor/picker.date.js",
        "vendor/picker.time.js",
        "vendor/bootstrap.js",
    ], "public/assets/js", 'resources/assets/js');

    mix.styles([
    	"app.css",
    	"font-awesome.min.css",
    ], 'public/assets/css/app.css');

    mix.styles([
        "picker/default.css",
        "picker/default.date.css",
        "picker/default.time.css",
    ], 'public/assets/css/vendor/picker.css','public/assets/css/vendor');

    mix.version(['assets/css/app.css','assets/js/all.js'])
});

