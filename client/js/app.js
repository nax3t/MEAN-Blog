var app = angular.module('meanBlog', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/posts',{
			templateUrl: "templates/index.html",
			controller: "PostsController"
		})
		.when('/posts/new', {
			templateUrl: "templates/new.html",
			controller: "NewPostController"
		})
		.when('/posts/:id', {
			templateUrl: "templates/show.html",
			controller: "PostController"
		})
		.when('/posts/:id/edit', {
			templateUrl: "templates/edit.html",
			controller: "EditPostController"
		})

	$locationProvider.html5Mode(true);
}]);