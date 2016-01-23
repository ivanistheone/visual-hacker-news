'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .controller('MainCtrl', function ($q,$timeout, $scope,latest,newsitem,bookmark,resolve_latest) {
    var index   = 0;
    var size    = null;
    $scope.news = [];
    $scope.busy = false;

    $scope.nextPage = function nextPage() {
    	var pageSize = 28;
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
    		},250);
    	});

    }
    // latest.$loaded().then(function(latestList){
        $scope.latestList = resolve_latest;
        size              = resolve_latest.length;
        $scope.nextPage();
        // console.log(resolve_latest);
        // latest.$watch(function(e) {
        //     if (e.event === "child_changed") {
        //       console.log("child_changed",e);
        //     }
        // });
    // });

    $scope.save = function(item) {
        item.isBookmarked = true;
        bookmark.add(item,$scope.user.uid);
    };
  });
