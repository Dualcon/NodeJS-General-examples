var fs = require('fs');

var filename = 'input.txt';

fs.readFile(filename, function (err, data) {
	if (err) return console.error(err);
	console.log("Asynchronous read: " + data.toString());
});
