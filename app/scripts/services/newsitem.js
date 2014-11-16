'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.newsitem
 * @description
 * # newsitem
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('newsitem', function ($q,$firebase) {
  return function(newsItem) {
  	var deferred = $q.defer();
    // create a reference to the user's profile
    var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/").child(newsItem);
    // return it as a synchronized object
    $firebase(ref).$asObject().$loaded().then(function(result){
    	deferred.resolve(result);
    });
    return deferred.promise;
  };
});
