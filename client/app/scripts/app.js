'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular.module('meanApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: ''
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/dashboard',{
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        resolve:{loggedIn:onlyLoggedIn}
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  var onlyLoggedIn = function ($location,$q,AuthFactory) {
    var deferred = $q.defer();
    if (AuthFactory.isAuthenticated()) {
        deferred.resolve();
    } else {
        deferred.reject();
        console.log("403: forbidden, please login first");
        $location.url('/login');
    }
    return deferred.promise;
  };



  // .run(['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, AuthFactory) {
  //   $rootScope.$on('$routeChangeStart', function (event) {

  //       if(event.authorize == true){
  //         if (!AuthFactory.isAuthenticated) {
  //           console.log('Access denied, please login first');
  //           event.preventDefault();
  //           $location.path('/login');
  //         }
  //       }
  //       else {
  //           console.log('ALLOW');
  //           $location.path('/dashboard');
  //       }
  //   });
  // }])

  ;

  // .run(["$rootScope", "$location", function($rootScope, $location) {
  //   $rootScope.$on("$routeChangeStart", function(evt, to, from) {
  //       // requires authorization?
  //       if (to.authorize === true)
  //       {
  //           to.resolve = to.resolve || {};
  //           if (!to.resolve.authorizationResolver)
  //           {
                
  //               to.resolve.authorizationResolver = ["authService", function(authService) {
  //                   return authService.authorize();
  //               }];
  //           }
  //       }
  //   });

  //   $rootScope.$on("$routeChangeError", function(evt, to, from, error) {
  //       if (error instanceof AuthorizationError)
  //       {
            
  //           $location
  //               .path("/login")
  //               .search("returnTo", to.originalPath);
  //       }
  //   });

  // }])

