var fs = require('fs');
var exports = module.exports = {};


exports.write = function(obj, filePath, cb) {
	var jsonString = JSON.stringify(obj, null, 2);
	fs.writeFile(filePath, jsonString, function(err) {
		if (err) return cb(err, null);
		return cb(err);
	});
};

exports.read = function(filePath, cb) {
	fs.readFile(filePath, function (err, data) {
		if (err) return cb(err, null);
	var obj = JSON.parse(data);
	cb(null, obj);
	});
};
