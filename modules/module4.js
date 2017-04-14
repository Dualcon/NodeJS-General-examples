function Foo(name){
   this.name = name;
}
 
Foo.prototype.service1 = function(){ console.log('Hello, ' + this.name); };
Foo.prototype.service2 = function(){ console.log('Hello World!'); };
 
module.exports = Foo;