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

app.service("UserService", function($http, $location, $q, $window){
  return {
    signup: function(user){
      return $http.post('/api/signup', user);
    },
    login: function(user){
      return $http.post('/api/login', user);
    },
    setCurrentUser: function(data){
      $window.localStorage.setItem("token",data.data.token);
      $window.localStorage.setItem("user",JSON.stringify(data.data.user));
    },
    getCurrentUser: function(){
      return JSON.parse($window.localStorage.getItem("user"));
    },
    logout: function(){
      localStorage.clear();
    },
    getAllUsers: function(){
      return $http.get("/api/users/");
    },
    getSingleUser: function(id){
      return $http.get("/api/users/" + id);
    },
    editUser: function(user){
      return $http.put("/api/users/" + user.data.id, user.data);
    },
    removeUser: function(user){
      return $http.delete("/api/users/" + user.id);
    }
  };
});