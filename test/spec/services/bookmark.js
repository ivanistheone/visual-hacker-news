'use strict';

describe('Service: bookmark', function () {

  // load the service's module
  beforeEach(module('visualHackerNewsApp'));

  // instantiate service
  var bookmark;
  beforeEach(inject(function (_bookmark_) {
    bookmark = _bookmark_;
  }));

  it('should do something', function () {
    expect(!!bookmark).toBe(true);
  });

});
