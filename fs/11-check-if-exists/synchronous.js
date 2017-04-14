var fs = require('fs');
var path = './test';

try {
    fs.accessSync(path, fs.F_OK);
console.log('Exists');
} catch (e) {
console.log('Not exists.');
}
