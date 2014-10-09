'use strict';

describe('Service: newsitem', function () {

  // load the service's module
  beforeEach(module('visualHackerNewsApp'));

  // instantiate service
  var newsitem;
  beforeEach(inject(function (_newsitem_) {
    newsitem = _newsitem_;
  }));

  it('should do something', function () {
    expect(!!newsitem).toBe(true);
  });

});
