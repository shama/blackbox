'use strict';

var blackbox = require('../lib/blackbox.js');
var spawn = require('child_process').spawn;

exports.blackbox = {
  setData: function(test) {
    test.expect(2);
    var data = {
      some: 'thing',
      bool: true,
      func: function() { test.ok(true); }
    };
    blackbox('test', data, function() {
      var result = '';
      var s = spawn(process.argv[0], ['test/spawnme.js']);
      s.stdout.on('data', function(data) { result += String(data); });
      s.on('exit', function() {
        test.ok((result.indexOf('{ some: \'thing\', bool: true, func: [Function] }') !== -1), 'data doesnt look ok');
        test.done();
      });
    });
  },
  differentPort: function(test) {
    test.expect(1);
    blackbox.port = 9001;
    blackbox('test', {yo:'stuff'}, function() {
      var result = '';
      var s = spawn(process.argv[0], ['test/spawnme.js']);
      s.stdout.on('data', function(data) { result += String(data); });
      s.on('exit', function() {
        test.ok((result.indexOf('{ yo: \'stuff\' }') !== -1), 'data doesnt look ok');
        test.done();
      });
    });
  },
};
