'use strict';

/**
 * @ngdoc overview
 * @name visualHackerNewsApp
 * @description
 * # visualHackerNewsApp
 *
 * Main module of the application.
 */
angular
  .module('visualHackerNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'infinite-scroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve : {
          "resolve_latest" : function(latest) {
            return latest.topstories().$loaded();
          }
        }
      })
      .when('/newstories', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve : {
          "resolve_latest" : function(latest) {
            return latest.newstories().$loaded();
          }
        }
      })
      .when('/showstories', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve : {
          "resolve_latest" : function(latest) {
            return latest.showstories().$loaded();
          }
        }
      })
      .when('/bookmarks', {
        templateUrl: 'views/saved.html',
        controller: 'SavedCtrl',
        requiresLogin: true,
        resolve : {
          "resolve_currentAuth" : function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError
          return Auth.ref.$requireAuth();
        }

        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, Auth, $location,$route) {
    // // track status of authentication
    Auth.ref.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
      $rootScope.user = user;
      if ($route.current.requiresLogin && !$rootScope.loggedIn) {
        $location.path("/");
      }
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj==="AUTH_REQUIRED") {
        $location.path("/");
      }
    });
  });
