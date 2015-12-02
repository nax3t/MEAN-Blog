app.service("PostService", ['$http', function($http) {
	return {
		getPosts: function() {
			return $http.get('/api/posts');
		},
		addPost: function(post) {
			return $http.post('/api/posts', post);
		}
	}
}]);