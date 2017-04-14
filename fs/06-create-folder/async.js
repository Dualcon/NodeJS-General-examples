var fs = require('fs');

var mkdir = function(path, mask, cb) {
	if (typeof mask == 'function') { // allow the `mask` parameter to be optional
		cb = mask;
		mask = 0777;
	}
	fs.mkdir(path, mask, function(err) {
		if (err) cb(err);
			else cb('successfully created folder');
	});
};


mkdir('tmp', function(err) {
	console.log(err);
});