var fs = require('fs');

var mkdir = function(dir) {  
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		console.log('Directory created.');
	} else {
		console.log('Directory already exists.');
	}
};

mkdir('tmp');
