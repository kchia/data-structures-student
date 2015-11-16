var HashTable = function(){
  this._limit = 8;
  this._count = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  // hash k
  var index = getIndexBelowMaxForKey(k, this._limit);
  var tuple;
  // check if bucket exists
  var bucket = this._storage.get(index);
  // if bucket doesnt exist,
  if (!bucket) {
    // create a bucket
    bucket = [];
    // push tuple into bucket
    tuple = [k, v];
    bucket.push(tuple);
    // increment count
    this._storage.set(index,bucket);
    this._count++;
    // check whether resize is needed
    if (this._count > 0.75 * this._limit) {
      this.resize();
    };
    return;
  }
  // if bucket exists
  if (bucket) {
    // iterate over tuples to check if k matches key in tuple
    for (var i = 0; i < bucket.length; i++) {
      // if it matches, update tuple's value
      if (bucket[i][0] === k) {
        bucket[i][1] = v;
        this._storage.set(index,bucket);
        break;
      }
      // if no match, push tuple into the bucket
      tuple = [k, v];
      bucket.push(tuple);
      // increment count
      this._storage.set(index,bucket);
      this._count++;
    // check whether resize is needed
      if (this._count > 0.75 * this._limit) {
        this.resize(this._limit * 2);
      };
    }
  }
};

HashTable.prototype.retrieve = function(k){
	// hash k
	var index = getIndexBelowMaxForKey(k, this._limit);
	var tuple;
	// check if bucket exists
	var bucket = this._storage.get(index);
	// if bucket doesnt exist,
	if (!bucket) {
	  return null;
	}
	// if bucket exists
	// iterate over tuples to check if k matches key in tuple
	for (var i = 0; i < bucket.length; i++) {
	  // if it matches, return tuple's value
	  tuple = bucket[i];
	  if (tuple[0] === k) {
	    return tuple[1];
	  }
	}
	return null;
};

HashTable.prototype.remove = function(k){
	// hash k
	var index = getIndexBelowMaxForKey(k, this._limit);
	var tuple;
	// check if bucket exists
	var bucket = this._storage.get(index);
	// if bucket doesnt exist,
	if (!bucket) {
	  return null;
	}
	// if bucket exists
	// iterate over tuples to check if k matches key in tuple
	for (var i = 0; i < bucket.length; i++) {
	  // if it matches, return tuple's value
	  tuple = bucket[i];
	  if (tuple[0] === k) {
	    bucket.splice(i,1);
	    this._count--;
	    if (this._count < 0.25 * this._limit) {
	      this.resize(this._limit * 1/2);
	    };
	  }
	}
};

HashTable.prototype.resize = function(newLimit){
  // Save copy of existing storage
  var oldStorage = this._storage;
  var context = this;
  // Reset the storage with the new limit and counter
  this._limit = newLimit;
  this._storage = LimitedArray(newLimit);
  this._count = 0;
  // Iterate through copy of storage
  oldStorage.each(function(bucket){
    // Insert each tuple into storage
    if (bucket !== undefined){
      for(var i = 0; i < bucket.length; i++){
        context.insert(bucket[i][0], bucket[i][1]);
      }
    }
  });
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
