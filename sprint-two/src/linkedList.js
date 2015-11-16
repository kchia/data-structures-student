var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newNode = Node(value);
    // if list doesn't exist
    if(!list.head) {
      list.head = newNode;
      list.tail = newNode;
    // if the list only has one node
    } else if(list.head === list.tail) {
      list.tail = newNode;
      list.head.next = this.tail;
    // if the list has more than one node
    } else {
      list.tail.next = newNode;
      list.tail = newNode;
    }
    return newNode;
  };

  list.removeHead = function(){
    //if there's no head or tail in the list
    if(!list.head) {
      return null;
    // if there's only one node in the list
    } else if (list.head === list.tail) {
      var currentHead = list.head;
      list.head = null;
      list.tail = null;
      return currentHead.value;
    // if there's more than one node in the list
    } else {
      var currentHead = list.head;
      list.head = list.head.next;
      return currentHead.value;
    }
  };

  list.contains = function(target){
      var currentNode = list.head;
      var found = false;

      while ( currentNode !== list.tail) {
        if (currentNode.value === target) {
          found = true;
        }
                currentNode = currentNode.next;
      }

      if (currentNode === list.tail && list.tail !== null) {
        if (currentNode.value === target) {
          found = true;
        }
      }

      return found;
    };
  return list;
};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
