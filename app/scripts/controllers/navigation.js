'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .controller('NavigationCtrl', function ($scope,Auth) {
  	$scope.login = function() {
  	  $scope.err = null;
  	  Auth.login()
  	    .then(function(authData) {
  	      $scope.user = authData;
  	      console.log("Logged in as:", authData.uid);
  	    }).catch(function(error) {
  	      console.error("Authentication failed:", error);
  	      $scope.err = error;
  	    });
  	};
  	$scope.logout = Auth.logout;
  });
