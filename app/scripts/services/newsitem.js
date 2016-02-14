'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.newsitem
 * @description
 * # newsitem
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('newsitem', function ($firebaseObject) {
  return function(newsItem) {
    // create a reference to the user's profile
    var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/").child(newsItem);
    // return it as a synchronized object
    return $firebaseObject(ref).$loaded();
  };
});
