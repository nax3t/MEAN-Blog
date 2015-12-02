app.service("PostService", ['$http', function($http) {
	return {
		getPosts: function() {
			return $http.get('/api/posts');
		},
		addPost: function(post) {
			return $http.post('/api/posts', post);
		},
		getPost: function(id) {
			return $http.get('/api/posts/'+id);
		},
		editPost: function(post) {
			return $http.put('/api/posts/'+post._id, post);
		},
		deletePost: function(id) {
			return $http.delete('/api/posts/'+id);
		}
	}
}]);