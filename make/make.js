var fs = require('fs');

var headless = fs.readFileSync('src/headless.js');
var tests = fs.readFileSync('tests.js');
fs.writeFileSync('make/run.js', headless + tests);