Sink Test
---------

An Asynchronous JavaScript Unit Testing Framework.

Sink test is used to test JavaScript that is run asynchronously in the browser whereby you tell the test a number of expectations and Sink will tell you if they each pass successfully.

It is used in other projects of mine such as [$script.js](http://github.com/polvero/script.js) and [Kizzy](http://github.com/polvero/kizzy) due to the async nature of dynamic script loading ($script) and asserting expired data from local storage (Kizzy).

How to write a Sink test
------------------------

    test('should have foo', 1, function() {
      $.ajax('/foo', function(resp) {
        ok(resp.stat == '200');
      });
    });
