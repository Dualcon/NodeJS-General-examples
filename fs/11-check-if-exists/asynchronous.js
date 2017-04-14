var fs = require('fs');
var path = './test';

fs.access(path, fs.F_OK, function(err) {
    if (!err) {
console.log('Exists');
    } else {
    console.log('Not exists.')
    }
});
