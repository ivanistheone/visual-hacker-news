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
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
