var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var shortid = require('shortid');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/public/javascripts/angularjs/views/index.html");
});

app.post('/upload', function(req, res, next) {
	//processAllFieldsOfTheForm(req, res, next);
	processFormFieldsIndividual(req, res);
});

var processAllFieldsOfTheForm = function(req, res, next) {
	// parse a text and file upload
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/uploads/";
	form.parse(req, function (err, fields, files) {
		// Store the data from the fields and files in your data store.
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('received the data:\n\n');
		res.end(util.inspect({
			fields: fields,
			files: files
		}));
	});
};

var processFormFieldsIndividual = function(req, res, next) {

	var fields = [];

	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = __dirname + "/public/uploads";
	form.hash = 'sha1';
	form.keepExtensions = false;
	form.multiples = true;

	// Call back when each field in the form is parsed:
	form.on('field', function (field, value) {
		console.log('Field: ' + field + ' Value: ' + value);
		fields[field] = value;
	});

	// Call back when each file in the form is parsed:
	form.on('file', function (name, file) {
		console.log('Name: ' + name + ' File: ' + file);
		// Storing the files meta in fields array. Depending on the application you can process it accordingly.
		// Case we want to keep the original file name:
		//fs.rename(file.path, form.uploadDir + "/" + file.name);
		//file.path = form.uploadDir + '/' + file.name;
		// Case we want an unique id for each file:
		var uniqueID = shortid.generate();
		fs.rename(file.path, form.uploadDir + "/" + uniqueID);
		file.path = form.uploadDir + "/" + uniqueID; 
		fields[uniqueID] = file;
	});

	// Call back for file upload progress:
	form.on('progress', function (bytesReceived, bytesExpected) {
		var progress = {
				type: 'progress',
				bytesReceived: bytesReceived,
				bytesExpected: bytesExpected
		};
		//Logging the progress on console. Depending on your application you can either send the progress to client for some visual feedback or perform some other operation.
		console.log('Progress: ' + progress + ' Percentage: ' + (bytesReceived * 100) / bytesExpected);
	});

	// Call back at the end of the form:
	form.on('end', function () {
//		res.writeHead(200, {
//		'content-type': 'text/plain'
//		});
1//		res.write('received the data:\n\n');
//		res.end(util.inspect({
//		fields: fields
//		}));
		res.redirect("/");
	});

	form.parse(req);
};

var port = 3000;
app.listen(port, function() {
	console.log('App running on port ' + port + '.');
});
