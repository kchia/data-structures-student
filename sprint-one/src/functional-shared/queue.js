var Queue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = {};
  queue.storage = {};
  queue.first = 0;
  queue.last = 0;
  _.extend(queue, queueMethods);
  return queue;
};

var queueMethods = {};

queueMethods.size = function(){
	return this.last - this.first;
};

queueMethods.enqueue = function(value){
  this.storage[this.last] = value;
  this.last++;
};

queueMethods.dequeue = function(){
	if(this.size()) {
	  var temp = this.storage[this.first];
	  delete this.storage[this.first];
	  this.first++;
	  return temp;
	}
};
