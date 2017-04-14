var fs = require("fs");

var filename = 'input.txt';
var str = 'Hello World!';
fs.writeFile(filename, str, function(err) {
	if (err) return console.error(err);
	console.log("Data written successfully!");
});
