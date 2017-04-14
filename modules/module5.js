var serviceA = {};
serviceA.service1 = function(name) { console.log('Hello, ' + name); };
serviceA.service2 = function(name) { console.log('Hello, ' + name); };

var serviceB = {};
serviceA.service1 = function(name) { console.log('Hello, ' + name); };
serviceA.service2 = function(name) { console.log('Hello, ' + name); };

module.exports = function(name){
	switch(name){
	case 'A': return serviceA;
	case 'B': return serviceB;
	default: throw new Error('Unknown service name: ' + name);
	}
};
