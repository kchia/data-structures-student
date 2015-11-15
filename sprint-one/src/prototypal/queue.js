var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = Object.create(Queue.methods);
  queue.storage = {};
  queue.first = 0;
  queue.last = 0;
  return queue;
};

Queue.methods = {};

Queue.methods.size = function(){
	return this.last - this.first;
};

Queue.methods.enqueue = function(value){
 	this.storage[this.last] = value;
 	this.last++;
};

Queue.methods.dequeue = function(){
	if(this.size()) {
		var temp = this.storage[this.first];
		delete this.storage[this.first];
		this.first++;
		return temp;
	}
};
