if (typeof module !== 'undefined' && module.exports) {
  var sinktest = require('../src/sink')
    , sink = sinktest.sink
    , start = sinktest.start;
}

sink('first pass', function (test, ok, before, after) {

  before(function () {
    console.log('BEFORE');
  });

  after(function () {
    console.log('AFTER');
  });

  test('should pass a test thing or two', 2, function () {
    ok(true, 'first thing');
    ok(true, 'second thing');
  });

  test('should pass even another set of tests a test', 3, function () {
    ok(1, 'third thing');
    ok(1, 'fourth thing');
    ok(1, 'fifth thing');
  });

});

sink('secondary set', function (t, k, b, a) {

  b(function () {
    console.log('secondary before');
  });

  a(function () {
    console.log('secondary after');
  });

  t('many talented people cannot count to three', 3, function () {
    k(1, 'one');
    k(2, 'two');
    k(3, 'three');
  });

});

sink('timeout tests (takes 20 seconds)', function (test, ok, before, after) {

  before(function () {
    sink.timeout = false;
  });

  test('should pass a test thing or two', 1, function () {
    setTimeout(function () {
      ok(true, 'timeout successfully nulled!');
    }, 20000)
  });

});

start();