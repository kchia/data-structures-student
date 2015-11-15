var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = Object.create(Stack.stuff)
  stack.storage = {};
  stack.count = 0;
  return stack;
};

Stack.stuff = {};

Stack.stuff.push = function(value){
	this.storage[this.count] = value;
	this.count++;
};

Stack.stuff.pop = function(){
	var size = this.size();
	if(size){
	  var popped = this.storage[size-1];
	  delete this.storage[size-1];
	  this.count--;
	  return popped;
	}
};

Stack.stuff.size = function(){
	return this.count;
};