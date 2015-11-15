var Queue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {},
      first = 0,
      last = 0;
  // Implement the methods below

  someInstance.size = function(){
    return last - first;
  };

  someInstance.enqueue = function(value){
    storage[last] = value;
    last++;
  };

  someInstance.dequeue = function(){
    if(someInstance.size()) {
      var temp = storage[first];
      delete storage[first];
      first++;
      return temp;
    }
  };


  return someInstance;
};
