'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:SavedCtrl
 * @description
 * # SavedCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .controller('SavedCtrl', function ($scope,bookmark,resolve_currentAuth) {
  	// console.log(resolve_currentAuth,$scope.user)
  	bookmark.read(resolve_currentAuth.uid)
  		.then(function(result){
  			$scope.news = result;
  		})
  });
