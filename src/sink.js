!function(context) {
  var total = 0,
      testing = false,
      fail = false,
      tests = [],
      item,
      allPass = true,
      isHeadless = (typeof module !== 'undefined' && module.exports);

  isHeadless && require('colors');

  function reset() {
    total = 0;
    fail = false;
    testing = false;
    init();
  }

  function failure(li, check) {
    allPass = false;
    if (isHeadless) {
      // console.log('x');
    } else {
      check.innerHTML = '×';
      li.className = 'fail';
    }
    reset();
  }

  function pass(li, check) {
    if (isHeadless) {
      // console.log('✓');
    } else {
      check.innerHTML = '✓';
      li.className = 'pass';
    }
    reset();
  }

  function bind(li) {
    li.onclick = function() {
      this.getElementsByTagName('ul')[0].className = 'show';
    };
  }

  function _test(name, expect, fn) {
    total = expect;
    var li, check;
    if (!isHeadless) {
      li = document.createElement('li');
      li.innerHTML = name + ' ... <span>o</span><ul></ul>';
      item = li.getElementsByTagName('ul')[0];
      bind(li);
      check = li.getElementsByTagName('span')[0];
      document.getElementById('tests').appendChild(li);
    } else {
      console.log(name + '...');
    }

    var start = +new Date;
    fn();
    setTimeout(function() {
      if (+new Date - start > 10000) {
        failure(li, check);
      } else {
        if (fail) {
          failure(li, check);
        } else if (!total) {
          pass(li, check);
        } else {
          setTimeout(arguments.callee, 50);
        }
      }
    }, 50);
  }

  function test(name, expect, fn) {
    tests.push({
      name: name,
      expect: expect,
      fn: fn
    });
  }

  function init() {
    if (tests.length > 0) {
      var o = tests.shift();
      _test(o.name, o.expect, o.fn);
    } else {
      // tests are done
      var message = [
        'Congratulations! All tests have passed!',
        'There were some errors! The suite has failed.'
      ];
      if (isHeadless) {
        console.log(message[allPass ? 0 : 1].toUpperCase().rainbow);
      }
    }
  }

  function ok(b, message) {
    if (isHeadless) {
      if (b) {
        console.log((message + ' ✓').green);
      } else {
        console.log(message + ' ×'.red);
      }
    } else {
      var li = document.createElement('li');
      li.innerHTML = message + ' ' + (b ? '✓' : '×');
      item.appendChild(li);
    }

    if (b) {
      total--;
    } else {
      fail = true;
    }
  }

  function expose() {
    for (var i=0; i < arguments.length; i++) {
      context[arguments[i].name] = arguments[i];
    }
  }

  function sink(fn) {
    fn(test, ok);
    init();
  }


  if (isHeadless) {
    module.exports = sink;
  } else {
    expose(sink);
  }

}(this);