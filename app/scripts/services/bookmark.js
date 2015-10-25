'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.bookmark
 * @description
 * # bookmark
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('bookmark', function (FBURL,$firebaseObject,$firebaseArray) {
    var users = new Firebase(FBURL+"/users");
    

    var meaningOfLife = 42;

    // Public API here
    return {
      add: function (item, uuid) {
        
        var $bookmarks = $firebaseObject(users.child(uuid).child("bookmarks"));
        $bookmarks.$loaded(function(result){
          // console.log(result)
          $bookmarks[item.id]=item;
          $bookmarks.$save();
        });
      },
      read: function(uuid){
        var $bookmarks = $firebaseArray(users.child(uuid).child("bookmarks"));
        return $bookmarks.$loaded();
      }
    };
  });
