'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .controller('MainCtrl', function ($q,$timeout, $scope,latest,newsitem) {
	var index   = 0;
	var size    = null;
	$scope.news = [];
	$scope.busy    = false;

    latest.$loaded().then(function(latestList){
		$scope.latestList = latestList;
		size              = latestList.length;
		$scope.nextPage();
    });
    $scope.nextPage = function nextPage() {
    	var pageSize = 10;
    	var pageList = $scope.latestList && $scope.latestList.slice(index,pageSize+index);
    	var qPagelist = [];
    	// console.log(size , index ,$scope.news.length, $scope.busy );
    	if ( !size || (index >= size ) || $scope.busy ) return;


    	angular.forEach(pageList, function(item){
    	  $scope.busy = true;
    	  qPagelist.push(newsitem(item.$value) );
    	});
    	$q.all(qPagelist).then(function(result){
    		
    		$scope.news = $scope.news.concat(_.flatten(result) );
    		// console.log($scope.news);
    		$timeout(function(){
	    		$scope.busy=false;
	    		index = index + pageSize;
    		},100);
    	});

    }
  });
