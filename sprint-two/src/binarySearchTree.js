var BinarySearchTree = function(value){
	this.value = value;
	this.left = null;
	this.right = null;
};

BinarySearchTree.prototype.insert = function(value) {
	if(value > this.value) {
		if(!this.right) {
			this.right = new BinarySearchTree(value);
		} else {
			this.right.insert(value);
		}
	}

	if(value < this.value) {
		if(!this.left) {
			this.left = new BinarySearchTree(value);
		} else {
			this.left.insert(value);
		}
	}
};

BinarySearchTree.prototype.contains = function(target) {
	if(this.value === target) {
		return true;
	} 

	if(!this.left && !this.right) {
		return false;
	}
	
	if(target > this.value) {
		return this.right.contains(target);
	}

	if(target < this.value) {
		return this.left.contains(target);
	}	
};

BinarySearchTree.prototype.depthFirstLog = function(callback){
	callback(this.value);
	if(this.left) {
		this.left.depthFirstLog(callback);
	}
	if(this.right) {
		this.right.depthFirstLog(callback);
	}

	return this;
};

BinarySearchTree.prototype.getHeight = function() {
	return this.maxHeight(0);
};

BinarySearchTree.prototype.maxHeight = function(currentHeight) {
	if(!this.left && !this.right){
		return currentHeight;
	}

	var nextHeight = currentHeight + 1;
	if(!this.left) {
		return this.right.maxHeight(nextHeight);
	} else if (!this.right) {
		return this.left.maxHeight(nextHeight);
	}

	var leftHeight = this.left.maxHeight(nextHeight);
	var rightHeight = this.right.maxHeight(nextHeight);

	return Math.max(leftHeight, rightHeight);
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
