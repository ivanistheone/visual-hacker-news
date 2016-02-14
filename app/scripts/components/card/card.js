'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.component:card
 * @description
 * # card
 * Card Component of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .component('card', {
    bindings: {
      item         : '<',
      saveAction   : '<',
      removeAction : '<'

    },
    controller: function (bookmark) {
      // console.log(this);
      this.save = function(item) {
          item.isBookmarked = true;
          bookmark.add(item);
      };
      this.remove = function(item) {
          bookmark.remove(item);
      };
    },
    templateUrl:"scripts/components/card/card.html"
  });
