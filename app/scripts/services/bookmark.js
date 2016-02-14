'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.bookmark
 * @description
 * # bookmark
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('bookmark', function ($rootScope,FBURL,$firebaseObject,$firebaseArray,$firebaseUtils) {
    var users = new Firebase(FBURL+"/users");

    // Public API here
    return {
      add: function (item) {
        
        // var $bookmarks = $firebaseObject(users.child(currentUserId).child("bookmarks").child(item.id));
        // $bookmarks.$loaded(function(result){
        //   console.log(result)
        //   $bookmarks=item;
        //   $bookmarks.$save();
        // });
        var currentUserId = $rootScope.user.uid;
        var bookmarkRef = users.child(currentUserId).child("bookmarks").child(item.id);
        bookmarkRef.transaction(function(currentData) {
          delete(item.$id);
          delete(item.$priority);
          var data = angular.fromJson(angular.toJson(item));
          if (currentData === null) {

            console.log(data);
            return data;
          }
        });
      },
      remove: function (item) {
        var currentUserId = $rootScope.user.uid;
        var bookmarkRef = users.child(currentUserId).child("bookmarks").child(item.id);
        var obj = $firebaseObject(bookmarkRef);
        obj.$remove().then(function(ref) {
          console.log(ref);
        });
      },
      read: function(currentUserId){

        var $bookmarks = $firebaseArray(users.child(currentUserId).child("bookmarks"));
        return $bookmarks.$loaded();
      }
    };
  });
