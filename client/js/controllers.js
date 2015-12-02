app.controller("PostsController", ['$scope', 'PostService', function($scope, PostService) {
	$scope.post = {};

	PostService.getPosts().then(function (posts) {
		$scope.posts = posts.data;
	});

	$scope.addPost = function(post) {
		PostService.addPost(post).then(function (post) {
			$location.path('/posts')
		})
	}
}]);

app.controller("NewPostController", ['$scope', 'PostService', '$location', function($scope, PostService, $location) {
	$scope.addPost = function(post) {
		PostService.addPost(post).then(function (post) {
			$location.path('/posts')
		})
	}
}]);

app.controller("PostController", ['$scope', 'PostService', '$location', '$routeParams', function($scope, PostService, $location, $routeParams) {
	PostService.getPost($routeParams.id).then(function (post) {
		$scope.post = post.data;
	});

	$scope.deletePost = function (id) {
		PostService.deletePost(id).then(function (data) {
			$location.path('/posts');
		})
	}
}]);

app.controller("EditPostController", ['$scope', 'PostService', '$location', '$routeParams', function($scope, PostService, $location, $routeParams) {
	PostService.getPost($routeParams.id).then(function (post) {
		$scope.post = post.data;
	});
	$scope.editPost = function(post) {
		PostService.editPost(post).then(function (data) {
			$location.path('/posts');
		});
	}
}]);