var fs = require('fs');

var rmdir = function(path) {
	  try {
		    fs.rmdirSync(path);
		  } catch(err) {
			    console.log(err);
			  }	
};

rmdir('tmp');
