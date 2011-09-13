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

//logkey is a server feature only
if (typeof module !== 'undefined' && module.exports) {

  sink('log key', function (test, ok, before, after) {

    test('should set a log key, effectively swallowing all logs not from sink', 1, function () {
      var log = console.log
        , count = 0;
      console.log = function () {
        count++;
      }
      sinktest.setLogKey('@fat::')
      console.log('1');
      console.log('2');
      console.log('3');
      console.log('@fat::huzzah');
      console.log('4');
      console.log('5');
      console.log = log;
      sinktest.setLogKey('');
      ok(count == 1, 'only logs prefixe with log key make it to console');
    });

  });
}

sink('timeout tests (takes 20 seconds)', function (test, ok, before, after, assert) {

  before(function () {
    sink.timeout = false
  })

  test('should be able to assert stuff. this shows fail', 1, function () {
    assert(1, 6, 'should have same numbers')
  })

  test('should be able to assert stuff. this shows pass', 1, function () {
    assert(2, 2, 'should have same numbers')
  })

  test('should pass a test thing or two', 1, function () {
    setTimeout(function () {
      ok(true, 'timeout successfully nulled!')
    }, 20000)
  })

})

start()