var fs = require('fs');

var filePath = './test.txt';
fs.unlink(filePath, function(err) {
	if (err) throw err;
	else console.log('File deleted.');
});