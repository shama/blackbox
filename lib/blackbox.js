/*
 * blackbox
 * https://github.com/shama/blackbox
 *
 * Copyright (c) 2012 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

// libs
var dnode = require('dnode');

// save data here
var data = {};

// main
var bb = module.exports = function(key, val, done) {
  if (typeof val === 'function') { done = val; val = null; }
  // attempt to connect
  var client = dnode.connect(bb.host, bb.port);
  client.on('error', function(err) {
    if (err.code === 'ECONNREFUSED') {
      // what no server? run one
      dnode({data: function(k, v, d) {
        // client set data on server
        if (v) { data[k] = v; }
        d(null, data[k]);
      }}).listen(bb.host, bb.port);
      // server running
      done(null, (data[key] = val));
    } else {
      done(err);
    }
  });
  // on data from server
  client.on('remote', function(remote) {
    remote.data(key, val, done);
  });
};

// defaults
bb.port = 5004;
bb.host = 'localhost';
