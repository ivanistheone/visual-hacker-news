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
      .when('/topstories', {
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
      .when('/bokmarks', {
        templateUrl: 'views/saved.html',
        controller: 'SavedCtrl',
        resolve : {
          "resolve_currentAuth" : function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.ref.$requireAuth();
        }

        }
      })
      .otherwise({
        redirectTo: '/topstories'
      });
  })
  .run(function($rootScope, Auth, $location) {
    // track status of authentication
    Auth.check(function(user) {

      $rootScope.loggedIn = !!user;
      $rootScope.user = user;

      if (!user) {
        $location.path("/")
      };
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj==="AUTH_REQUIRED") {
        $location.path("/");
      }
    });

  });
