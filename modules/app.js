var mod1 = require('./module1');
mod1.service2('Daniel');

var mod2 = require('./module2');
mod2.service2('John');

var mod3 = require('./module3');
mod3.service2('Isabel');

var mod4 = require('./module4');
var foo = new mod4('Luis');
foo.service1();

var mod5 = require('./module5');
var m5 = mod5('A');
m5.service1('Suri');

var anotherMod5 = require('./module5')('A');
anotherMod5.service2('Marília');
