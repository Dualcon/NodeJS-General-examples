var fs = require('fs');

var filename = 'input.txt';
var data = fs.readFileSync(filename);
console.log("Synchronous read: " + data.toString());