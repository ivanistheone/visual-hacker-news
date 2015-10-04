'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.newsitem
 * @description
 * # newsitem
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('newsitem', function ($q,$firebaseObject) {
  return function(newsItem) {
  	var deferred = $q.defer();
    // create a reference to the user's profile
    var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/").child(newsItem);
    // return it as a synchronized object
    $firebaseObject(ref).$loaded().then(function(result){
    	delete result.kids;
    	// console.log(result)
    	deferred.resolve(result);
    });
    return deferred.promise;
  };
});
