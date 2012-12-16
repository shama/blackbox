# blackbox

Put data in; take data out; same data across child processes or networks with
[dnode](https://github.com/substack/dnode).

[![build status](https://secure.travis-ci.org/shama/blackbox.png)](http://travis-ci.org/shama/blackbox)

## Documentation
Install the module with: `npm install blackbox`

```javascript
var blackbox = require('blackbox');

// Save some stuff
blackbox('stuff', {beep: 'boop'}, function() {
  console.log('saved your stuff.');
});

// Spawn some child process
var spawn = require('child_process').spawn;
spawn('node', ['child_script.js']);
```

Meanwhile inside the spawned `child_script.js`:

```javascript
var blackbox = require('blackbox');

// Get your stuff
blackbox('stuff', function(err, data) {
  console.log('here is your stuff:');
  console.log(data);
  // data === { beep: 'boop' }
});
```

Or set a different `port` or `host`:

```javascript
var blackbox = require('blackbox');

blackbox.port = 9001;
blackbox.host = 'example.com';

(function runAgain() {
  // Does stuff exist?
  blackbox('stuff', function(err, data) {
    if (!data) {
    	// Nope lets create it
      blackbox('stuff', {beep: 'boop'}, runAgain);
    } else {
      console.log('here is your stuff:');
      console.log(data);
      // data === { beep: 'boop' }
    }
  });
}());
```

## Why?
[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) spawns
tasks as child processes. This fixed a lot of issues. But then tasks could no
longer persist or share data across tasks as the watch ran them.

One day in IRC, [@cowboy](https://github.com/cowboy) suggested creating a pubsub
lib so tasks could persist data and recommended dnode. Thus this lib was
created.

This lib probably already exists but I couldn't find one and this was fun to
create.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## Release History
* 0.1.0 - Initial release

## License
Copyright (c) 2012 Kyle Robinson Young  
Licensed under the MIT license.
