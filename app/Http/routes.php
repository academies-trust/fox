<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/**
 * Displays Angular SPA application
 */

Route::get('/', function () {
    return view('spa');
});

Route::post('gitupdate', function() {
	echo "<pre>Doing GIT stuff...</pre>";
	$ret = shell_exec("cd C:\\inetpub\\wwwroot\\fox-front && git pull origin master");
	echo "<pre>".$ret."</pre>";

	$ret = shell_exec("cd C:\\inetpub\\wwwroot\\fox-front && composer install");
	echo "<pre>".$ret."</pre>";
});