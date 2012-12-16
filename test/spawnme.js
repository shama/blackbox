// just a script that gets spawned by the tests

'use strict';

var blackbox = require('../lib/blackbox.js');

blackbox('test', function(err, data) {
  console.log(data);
  data.func('func ran');
  process.exit();
});
