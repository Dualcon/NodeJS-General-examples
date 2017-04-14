var path = require("path");

var fileName = 'c:\\test.txt';
var extension = path.extname(fileName);
var file = path.basename(fileName,extension);
console.log(file);
