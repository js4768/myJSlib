
function PriorityQueue(input, CompareFunc) {
  if (this instanceof PriorityQueue) {
    let _nodes = input;
    let _compare = CompareFunc ? CompareFunc : function(a, b) {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    }
    _nodes.sort(_compare);

    this.offer = function(val) {
      _nodes.push(val);
      this.fixUp(_node.length - 1);
    };

    this.poll = function() {
      if (_nodes.length <= 0) {
        return;
      }
      let result = _nodes.splice(0, 1)[0];
      if (_nodes.length > 0) {
        _nodes.splice(0, 0, _nodes.splice(_nodes.length - 1)[0]);
        this.fixDown(0);
      }
      return result;
    };

    this.fixUp = function(index) {
      if(index <= 0) return;
      let parent = this.getParentIndex(index);
      if(_compare(_nodes[parent], _nodes[index]) > 0) {
        _swap(parent, index);
        let leftChild = this.getLeftChildIndex(parent);
        let rightChild = this.getRightChildIndex(parent);
        if (leftChild < _nodes.length && _compare(_nodes[parent], _nodes[leftChild]) > 0) {
          _swap(parent, leftChild);
        }
        if (rightChild < _nodes.length && _compare(_nodes[parent], _nodes[rightChild]) > 0) {
          _swap(parent, rightChild);
        }
      }
      return this.fixUp(parent);
    };

    this.fixDown = function(index) {
      if(index >= _nodes.length) return;
      let leftChild = this.getLeftChildIndex(index);
      let rightChild = this.getRightChildIndex(index);
      if ((leftChild < _nodes.length && _compare(_nodes[index], _nodes[leftChild]) > 0)
       || (rightChild < _nodes.length && _compare(_nodes[index], _nodes[rightChild]) > 0)) {
         let min = _nodes[index];
         let swapIndex = index;
         if (leftChild < _nodes.length && _compare(min, _nodes[leftChild]) > 0) {
           min = _nodes[leftChild];
           swapIndex = leftChild;
         }
         if (rightChild < _nodes.length && _compare(min, _nodes[rightChild]) > 0) {
           min = _nodes[rightChild];
           swapIndex = rightChild;
         }
         _swap(index, swapIndex);
         this.fixDown(swapIndex);
      }
    };

    this.getLeftChildIndex = function(index) {
      return index * 2 + 1;
    };

    this.getRightChildIndex = function(index) {
      return index * 2 + 2;
    };

    this.getParentIndex = function(index) {
      return Math.floor((index-1)/2);
    };

    function _swap(i, j) {
      var temp = _nodes[i];
      _nodes[i] = _nodes[j];
      _nodes[j] = temp;
    }
  } else {
    return new PriorityQueue(input, CompareFunc);
  }
}
