var fs = require('fs');

var file = 'input.txt';
var data = 'Hello World!';
fs.writeFileSync(file, data);
