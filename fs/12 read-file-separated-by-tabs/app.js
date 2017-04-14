var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var file = './file.txt';
var data = [];

var instream = fs.createReadStream(file);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
  // process line here
  var res = line.split('	');
  console.log(res.length);
  //console.log(line);
});

rl.on('close', function() {
  // do something on finish here
});