// USER & AUTH CONTROLLERS
app.controller("SignupController", function($scope, UserService, $location){
  $scope.signup = function(user){
    UserService.signup(user).then(function(data){
      UserService.setCurrentUser(data);
      $location.path('/home');
    }).catch(function(data){
      $scope.errors = data.data;
      $scope.user = {};
    });
  };
});

app.controller("LoginController", function($scope, UserService, $location, $window){
  $scope.login = function(user){
    UserService.login(user).then(function(data){
      UserService.setCurrentUser(data);
      $location.path('/home');
    }).catch(function(data){
      $scope.errors = data.data;
      $scope.user = {};
    });
  };
});

app.controller("UserController", function($scope, $location, UserService, user,currentUser, $window){
  $scope.currentUser = currentUser;
  $scope.user = user;
});

app.controller("EditController", function($scope, $location, UserService, user,currentUser, $window){
  $scope.currentUser = currentUser;
  $scope.user = user;
  $scope.editUser = function(user){
    UserService.editUser(user).then(function(data){
      $window.localStorage.removeItem("user");
      $window.localStorage.setItem("user",JSON.stringify(data.data));
      $location.path('/home');
    }).catch(function(err){
      $scope.errors = "Looks like someone already has that username!";
      $scope.user = {};
    });
  };

  $scope.removeUser = function(user){
    UserService.removeUser(user).then(function(data){
      $window.localStorage.clear();
      $location.path('/login');
    }).catch(function(err){
      $scope.errors = err;
    });
  };
});

app.controller("HomeController", function($scope,currentUser,users){
  $scope.users = users;
  $scope.currentUser = currentUser;
});

// POSTS CONTROLLERS
app.controller("PostsController", ['$scope', 'PostService', function($scope, PostService) {
	$scope.post = {};

	PostService.getPosts().then(function (posts) {
    debugger
		$scope.posts = posts.data;
	});
}]);

app.controller("NewPostController", ['$scope', 'PostService', '$location', 'UserService', function($scope, PostService, $location, UserService) {
  // var user_id = UserService.getCurrentUser().id;
  $scope.addPost = function(post) {
    // post.user = user_id;
    var railsPost = {}
    railsPost.post = post
    PostService.addPost(railsPost).then(function (post) {
  	$scope.post = {};
      debugger
			$location.path('/posts')
		})
	}
}]);

app.controller("PostController", ['$scope', 'PostService', '$location', '$routeParams', 'UserService', function($scope, PostService, $location, $routeParams, UserService) {
	PostService.getPost($routeParams.id).then(function (post) {
		$scope.post = post.data;
		UserService.getSingleUser(post.data.user).then(function (user) {
			$scope.post.user = user.data;
		})
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