app.controller("PostsController", ['$scope', 'PostService', '$location', function($scope, PostService, $location) {
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