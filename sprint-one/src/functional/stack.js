var Stack = function(){
  var someInstance = {},

  // Use an object with numeric keys to store values
      storage = {},
      count = 0;

  // Implement the methods below
  someInstance.push = function(value){
    storage[count] = value;
    count++;
  };

  someInstance.pop = function(){
    var size = someInstance.size();
    if(size){
      var popped = storage[size-1];
      delete storage[size-1];
      count--;
      return popped;
    }
  };

  someInstance.size = function(){
    return count;
  };

  return someInstance;
};
