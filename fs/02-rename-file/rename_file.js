var fs = require('fs');

var filename = 'original.txt';
var newFilename = 'renamed.txt';

fs.rename(filename, newFilename, function(err) {
	if ( err ) console.log('ERROR: ' + err);
	else console.log('File renamed to: ' + newFilename);
});
