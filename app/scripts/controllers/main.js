'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .controller('MainCtrl', function ($scope,latest,newsitem) {
  	$scope.news=[];
    latest.$loaded().then(function(latestList){
    	$scope.latestList = latestList;
    	angular.forEach(latestList, function(value, key){
    	  $scope.news.push(newsitem(value) );
    	})
    });
  });
