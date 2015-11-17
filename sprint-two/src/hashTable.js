// var HashTable = function(){
//   this._limit = 8;
//   this._count = 0;
//   this._storage = LimitedArray(this._limit);
// };

// HashTable.prototype.insert = function(k, v){
//   // hash k
//   var index = getIndexBelowMaxForKey(k, this._limit);
//   var tuple;
//   // check if bucket exists
//   var bucket = this._storage.get(index);
//   // if bucket doesnt exist,
//   if (!bucket) {
//     // create a bucket
//     bucket = [];
//     // push tuple into bucket
//     tuple = [k, v];
//     bucket.push(tuple);
//     // increment count
//     this._storage.set(index,bucket);
//     this._count++;
//     // check whether resize is needed
//     if (this._count > 0.75 * this._limit) {
//       this.resize();
//     };
//     return;
//   }
//   // if bucket exists
//   if (bucket) {
//     // iterate over tuples to check if k matches key in tuple
//     for (var i = 0; i < bucket.length; i++) {
//       // if it matches, update tuple's value
//       if (bucket[i][0] === k) {
//         bucket[i][1] = v;
//         this._storage.set(index,bucket);
//         break;
//       }
//       // if no match, push tuple into the bucket
//       tuple = [k, v];
//       bucket.push(tuple);
//       // increment count
//       this._storage.set(index,bucket);
//       this._count++;
//     // check whether resize is needed
//       if (this._count > 0.75 * this._limit) {
//         this.resize(this._limit * 2);
//       };
//     }
//   }
// };

// HashTable.prototype.retrieve = function(k){
// 	// hash k
// 	var index = getIndexBelowMaxForKey(k, this._limit);
// 	var tuple;
// 	// check if bucket exists
// 	var bucket = this._storage.get(index);
// 	// if bucket doesnt exist,
// 	if (!bucket) {
// 	  return null;
// 	}
// 	// if bucket exists
// 	// iterate over tuples to check if k matches key in tuple
// 	for (var i = 0; i < bucket.length; i++) {
// 	  // if it matches, return tuple's value
// 	  tuple = bucket[i];
// 	  if (tuple[0] === k) {
// 	    return tuple[1];
// 	  }
// 	}
// 	return null;
// };

// HashTable.prototype.remove = function(k){
// 	// hash k
// 	var index = getIndexBelowMaxForKey(k, this._limit);
// 	var tuple;
// 	// check if bucket exists
// 	var bucket = this._storage.get(index);
// 	// if bucket doesnt exist,
// 	if (!bucket) {
// 	  return null;
// 	}
// 	// if bucket exists
// 	// iterate over tuples to check if k matches key in tuple
// 	for (var i = 0; i < bucket.length; i++) {
// 	  // if it matches, return tuple's value
// 	  tuple = bucket[i];
// 	  if (tuple[0] === k) {
// 	    bucket.splice(i,1);
// 	    this._count--;
// 	    if (this._count < 0.25 * this._limit) {
// 	      this.resize(this._limit * 1/2);
// 	    };
// 	  }
// 	}
// };

// HashTable.prototype.resize = function(newLimit){
//   // Save copy of existing storage
//   var oldStorage = this._storage;
//   var context = this;
//   // Reset the storage with the new limit and counter
//   this._limit = newLimit;
//   this._storage = LimitedArray(newLimit);
//   this._count = 0;
//   // Iterate through copy of storage
//   oldStorage.each(function(bucket){
//     // Insert each tuple into storage
//     if (bucket !== undefined){
//       for(var i = 0; i < bucket.length; i++){
//         context.insert(bucket[i][0], bucket[i][1]);
//       }
//     }
//   });
// };
/*
 * Complexity: What is the time complexity of the above functions?
 */


 /*
 VERSION 2
 */

var HashTable = function() {
	this.storage = [];
	this._limit = 4;
	this.size = 0;
};

HashTable.prototype.resize = function(newSize) {
	var resizing = false;
	if(!resizing) {
		resizing = true;
		var pairs = [];
		// store tuples temporarily in a new container
		for(var i = 0; i < this.storage.length; i++) {
			if(!this.storage[i]){continue; }
			for(var j = 0; j < this.storage[i].length; j++) {
				if(!this.storage[i][j]) { continue; }
				pairs.push(this.storage[i][j]);
			}
		}

		this._limit = newSize;
		this.storage = [];
		this.size = 0;

		//re-insert tuples back into storage
		for(var k = 0; k < pairs.length; k++) {
			this.insert(pairs[k][0], pairs[k][1]);
		}
		resizing = false;
	}
};

HashTable.prototype.insert = function(k,v) {
	var index = getIndexBelowMaxForKey(k, this._limit);
	//check if bucket exists
	this.storage[index] = this.storage[index] || [];
	var pairs = this.storage[index];
	var pair;
	var replaced = false;
	// check if key exists
	for(var i = 0; i < pairs.length; i++) {
		pair = pairs[i];
		if(pair[0] === k) {
			pair[1] = v;
			replaced = true;
		}
	}

	if(!replaced){
		this.storage[index].push([k,v]);
		this.size++;
	}

	if(this.size >= this._limit * 0.75) {
		this.resize(this._limit * 2);
	}
};

HashTable.prototype.retrieve = function(k) {
	var index = getIndexBelowMaxForKey(k, this._limit);
	var pairs = this.storage[index];
	if(!pairs){return; }
	var pair;
	for(var i = 0; i < pairs.length; i++) {
		pair = pairs[i];
		if(pair[0] === k) {
			return pair[1];
		}
	}
};

HashTable.prototype.remove = function(k) {
	var index = getIndexBelowMaxForKey(k, this._limit);
	var pairs = this.storage[index];
	if(!pairs){return; }
	var pair;
	for(var i = 0; i < pairs.length; i++) {
		pair = pairs[i];
		if(pair[0] === k) {
			var removed = pair[1];
			pairs[i][1] = null;
			this.size--;
			if(this.size <= this._limit * 0.25) {
				this.resize(this._limit / 2);
			}
			return removed;
		}
	}
};


var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for(var i = 0; i < str.length; i++){
    hash = (hash <<5) + hash + str.charCodeAt(i);
    hash = hash & hash // convert to 32 bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
}







