var app = angular.module('meanBlog', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/posts',{
			templateUrl: "templates/index.html",
			controller: "PostsController"
		})
		.when('/posts/new', {
			templateUrl: "templates/new.html",
			controller: "PostsController"
		})

	$locationProvider.html5Mode(true);
}]);