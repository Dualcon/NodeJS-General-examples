var fs = require('fs');

var rmdir = function(path, cb) {
	fs.rmdir(path, function(err) {
		if (err) cb(err);
		else cb('Succesfully deleted.');
	});
}

rmdir('tmp', function(result) {
	console.log(result);
});
