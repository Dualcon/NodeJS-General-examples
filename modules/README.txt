How to Declare Modules in Node.js 

One of those aspects of Node.js that took me a while to fully understand initially is how to properly declare modules. At first it looks kind of obvious and intuitively simple, but later, you realize you can expose different types of objects like functions, constructors, properties or entire object instances. So I have decided to write this article with different examples and techniques I learned while writing different type of modules in Node.js. 
On Modules, Import and Export
Let’s start by the most obvious and simple thing. Something probably everyone learns since the first day of work with Node: every code file is considered a module. The variables, properties, functions, constructors that we declared in it are private to the module and other modules cannot gain access to them or use them unless the programmer of the module explicitly expose them to the public; namely everything we declare inside a module is encapsulated and hidden from the outside world by default unless explicitly stated otherwise. To expose something the programmer has access to a special object called module, which has a special property called exports. Everything that you publish in the module.exports object is made publicly available to other modules. For instance, in the code below, the variable pi is inaccessible to any other modules but foo.js, whereas the property named bar is made publicly available to any other modules importing the module foo.js. Note that this is a fundamental difference from JavaScript in Node.js when compared with JavaScript as executed in a browser where objects are publicly exposed in a global object (i.e. window).
//module foo.js
var pi = 3.14;
module.exports.bar = 'Hello World';
Now a second module baz.js can “import” the module foo.js and gain access to the property bar. In Node, we achieve this effect by means of using a global function named require. Somewhat as follows:
//module baz.js
var foo = require('./foo');
console.log(foo.bar); //yields Hello World
Technique 1 – Extending exports Object with Additional Functionality
So, one technique to expose the functionality in a module consists in adding functions and properties to the module.exports object. When this is the case, Node provides a direct access to the exports object to make things simpler for us. For instance:
//module foo.js
exports.serviceOne = function(){ };
exports.serviceTwo = function(){ };
exports.serviceThree = function(){ };
And as you might expect, the users of this module, at importing it, would obtain a reference to the exports object and by this they would gain access to all the functionality exposed in it.
//module bar.js
var foo = require('./foo');
foo.serviceOne();
foo.serviceTwo();
foo.serviceThree();
Technique 2 – Substitute Default exports Object with Another Object
By this point you probably suspect that given the fact that module.exports is just an object that exposes the public part of a module then we could probably define our own object and then replace the default module.exports object with our own. For instance:
//module foo.js
var service = {
   serviceOne: function(){ },
   serviceTwo: function(){ },
   serviceThree = function(){ }
};
 
module.exports = service;
The code in this last example would behave exactly as the code in the previous example, it’s just that this time we have explicitly created our exported object instead of using the one provided by default by Node.
Technique 3 – Substitute Default exports Object with a Constructor Function
In the examples so far we have always used an instance of an object as our exposed target. However there are occasions in which it may seem more convenient to allow the user to create as many instances of a given type as she wants. Nothing prevents us from replacing the module.exports object with other types of objects like a constructor function. In the example below we expose a constructor which the user can use to create many instances of the Foo type.
//module Foo.js
function Foo(name){
   this.name = name;
}
 
Foo.prototype.serviceOne = function(){ };
Foo.prototype.serviceTwo = function(){ };
Foo.prototype.serviceThree = function(){ };
 
module.exports = Foo;
And the user of this module can simply do something like this:
//module bar.js
var Foo = require('./Foo');
var foo = new Foo('Obi-wan');
foo.serviceOne();
foo.serviceTwo();
foo.serviceThree();
Technique 4 – Substitute Default exports Object with Plain Old Function
It is easy to imagine now that if we can use a constructor function then we might just as well be able to use any other plain old JavaScript function as the target exposed in module.exports.
As in the following example in which our exported function allows the user of this module to gain access to one of several other encapsulated service objects.
//foo.js
var serviceA = {};
serviceA.serviceOne = function(){ };
serviceA.serviceTwo = function(){ };
serviceA.serviceThree = function(){ };
 
var serviceB = {};
serviceB.serviceOne = function(){ };
serviceB.serviceTwo = function(){ };
serviceB.serviceThree = function(){ };
 
module.exports = function(name){
   switch(name){
      case 'A': return serviceA;
      case 'B': return serviceB;
      default: throw new Error('Unknown service name: ' + name);
   }
};
Now the user that imports this module receives a reference to our anonymous function declared above and then she can simply invoke the function to gain access to one of our encapsulated objects. For instance:
//module bar.js
var foo = require('./foo');
var obj = foo('A');
obj.serviceOne();
obj.serviceTwo();
obj.serviceThree();
Many programmers ordinarily invoke the function immediately returned by require instead of assigning it to a reference first. For instance:
//module bar.js
var foo = require('./foo')('A');
foo.serviceOne();
foo.serviceTwo();
foo.serviceThree();
So, in summary, it is as simple as follows: everything that we expose in module.exports is what we get when we invoke require. And using different techniques we could expose objects, constructors functions, properties, etc.
About Modules and the use Global State
An interesting aspect of modules is the way they are evaluated. The module is evaluated the first time it is required and then it is cached. This means that after it has been evaluated no matter how many times we require it, we will always get the same exported object back.
This means that, although Node provides a global object, it is probably better to use modules to store shared stated instead of putting it directly into the global object. For instance, the following module exposes the configuration of a Mongo database.
//module config.js
 
dbConfig = {
  url:'mongodb://foo',
  user: 'anakin',
  password: '*******'
}
We can easily share this module with as many other modules as we want, and everyone of them will get the exact same instance of the configuration object since the module is evaluated only once and the exported object is cached from there on.
//foo.js
var dbConfig1 = require('./config');
var dbConfig2 = require('./config');
var assert = require('assert');
assert(dbConfig1==dbConfi2);
