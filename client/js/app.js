var app = angular.module('meanBlog', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider
		.when('/posts',{
			templateUrl: "templates/posts/index.html",
			controller: "PostsController"
		})
		.when('/posts/new', {
			templateUrl: "templates/posts/new.html",
			controller: "NewPostController"
		})
		.when('/posts/:id', {
			templateUrl: "templates/posts/show.html",
			controller: "PostController"
		})
		.when('/posts/:id/edit', {
			templateUrl: "templates/posts/edit.html",
			controller: "EditPostController"
		})
		.when('/',{
		    templateUrl: "templates/users/login.html",
		    controller: "LoginController",
		    preventWhenLoggedIn: true
		  })
		  .when('/signup',{
		    templateUrl: "templates/users/signup.html",
		    controller: "SignupController",
		    preventWhenLoggedIn: true,
		    signup: true
		  })
		  .when('/login',{
		    templateUrl: "templates/users/login.html",
		    controller: "LoginController",
		    preventWhenLoggedIn: true
		  })
		  .when('/home',{
		    templateUrl: "templates/users/home.html",
		    controller: "HomeController",
		    restricted: true,
		    resolve: {
		      currentUser : function(UserService) {
		        return UserService.getCurrentUser();
		      },
		      users: function(UserService){
		        return UserService.getAllUsers();
		      }
		    }
		  })
		  .when('/logout',{
		    restricted: true,
		    resolve: {
		      app: function(UserService, $location){
		        UserService.logout();
		        $location.path("/login");
		      }
		    }
		  })
		  .when('/users/:id',{
		    templateUrl: "templates/users/user.html",
		    controller: "UserController",
		    restricted: true,
		    resolve: {
		      currentUser: function(UserService) {
		        return UserService.getCurrentUser();
		      },
		      user: function(UserService,$route){
		        return UserService.getSingleUser($route.current.params.id);
		      }
		    }
		  })
		  .when('/users/:id/edit',{
		    templateUrl: "templates/users/edit.html",
		    controller: "EditController",
		    restricted: true,
		    resolve: {
		      currentUser: function(UserService) {
		        return UserService.getCurrentUser();
		      },
		      user: function(UserService,$route){
		        return UserService.getSingleUser($route.current.params.id);
		      }
		    }
		  })
		  .otherwise({redirectTo: '/'});

		  $locationProvider.html5Mode(true);

		  $httpProvider.interceptors.push("AuthInterceptor");
}]);

app.service("AuthInterceptor", function($window,$location,$q){
  return {
    request: function(config){
      // prevent browser bar tampering for /api routes
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      var token = $window.localStorage.getItem("token");
      if(token)
        config.headers.Authorization = "Bearer " + token;
      return config;
    },
    responseError: function(err){
      // if you mess around with the token, log them out and destroy it
      if(err.data === "invalid token" || err.data === "invalid signature" || err.data === "jwt malformed"){
        $location.path("/logout");
        return $q.reject(err);
      }
      // if you try to access a user who is not yourself
      if(err.status === 401){
        $location.path('/home');
        return $q.reject(err);
      }
      return $q.reject(err);
    }
  };
});

app.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if you try access a restricted page without logging in
    if (next.restricted && !localStorage.getItem("token")) {
      if(current && current.signup)
        $location.path('/signup');
      else
        $location.path('/login');
    }
    // if you try to log in or sign up once logged in
    if (next.preventWhenLoggedIn && localStorage.getItem("token")) {
      $location.path('/home');
    }
  });
});