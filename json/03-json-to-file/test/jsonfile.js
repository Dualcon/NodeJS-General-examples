var expect    = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var jsonfile = require('../lib/jsonfile');

describe('json-to-file module.', function() {

	var filePath = './test.json';
	var obj = { name: 'John', age: 30 };


	after(function (done) {
		// Delete test file:
		fs.unlink(filePath, function(err) {
			if (err) throw err;
			done();
		});		
	});


	it('Write json to file.', function(done) {
		jsonfile.write(obj, filePath, function(err) {
			if (err) throw err;
			done();
		});		
	});


	it('Read json from file.', function(done) {
		jsonfile.read(filePath, function(err, actual) {
			if (err) throw err;
			expect(actual).to.deep.equal(obj);
			done();
		});
	});

});
