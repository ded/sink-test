var sink = require('./');

sink(function (test, ok) {
  test('should pass a test', 2, function () {
    ok(true, 'first thing');
    ok(true, 'second thing');
  });
  test('should pass even another set of tests a test', 3, function () {
    ok(1, 'yay it passes again');
    ok(1, 'bossh another test');
    ok(1, 'wow. neato');
  });
});