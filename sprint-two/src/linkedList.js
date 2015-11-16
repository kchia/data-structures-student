var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var newNode = Node(value);
    // if list doesn't exist
    if(!list) {
      list.head = newNode;
      list.tail = newNode;
    // if the list only has one node
    } else if(list.head === list.tail) {
      this.tail = newNode;
      this.head.next = this.tail;
    // if the list has more than one node
    } else {
      this.tail = newNode;
    }
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
