const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.amount = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.amount++;
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root != null) {
			var detached = this.detachRoot();
			this.amount--;
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}
	}

	detachRoot() {
		var detached = this.root;
		if(this.parentNodes.indexOf(this.root) == 0)
			this.parentNodes.shift();
		this.root = null;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		if ((detached instanceof Node) == false) 
				return;
		if(detached != null) {
		var node = this.parentNodes[this.parentNodes.length - 1];
		if(node) { //если куча не пустая

		if(node.parent == detached) // если узел ребенок бывшего корня 
		{	
			if(detached.right != null) {
				detached.right = null;
				node.parent = null;
			}
			else
				detached.left = null;
		}
		else {
			var bla;
			if(node.parent.right == node) {
				bla = true;
				var par = node.parent;
				node.remove();
			}
			else
				bla = false;
			node.remove();
		}

		this.root = node;
		this.root.left = detached.left;
		this.root.right = detached.right;
		this.parentNodes.pop(); // maintain parent nodes

		if(detached.left == null || detached.right == null) // maintain parent nodes
			this.parentNodes.unshift(this.root);
		else if(bla)
			this.parentNodes.unshift(par);

		if(detached.left)
			this.root.left.parent = node;
		if(detached.right)
			this.root.right.parent = node; 	
		}
	}
	}

	size() {
		return this.amount;
	}

	isEmpty() {
		return this.root == null ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.amount = 0;
		
	}

	insertNode(node) { // точно правильно
		if(this.root == null) {
			this.root = node;
			this.parentNodes[0] = this.root;
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if(node.parent.right == node)
				this.parentNodes.shift();
		}
	}																		

	shiftNodeUp(node) {

		if(node.parent != null && node.priority > node.parent.priority) { 
			if(node.parent == this.root)
				this.root = node;
			if(this.parentNodes.indexOf(node) != -1) {
				if(this.parentNodes.indexOf(node.parent) != -1) {
					var tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
					var indexOfParent = this.parentNodes.indexOf(node.parent);
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
					this.parentNodes[indexOfParent] = tempNode; 
				}
				else 
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
        		}
        		node.swapWithParent();
				this.shiftNodeUp(node);
        	}
			
			delete this.parentNodes[-1];
		}
        
	

	shiftNodeDown(node) {												//если тут быдло-код, то искренне прошу прощения, еще не исправил
		if(node != null) {
		if(node.left != null) { // если есть хотя бы левый ребенок

			if(node.right != null) //если есть оба ребенка 
			{
				var isLeft = node.left.priority > node.right.priority ? true : false; //сравниваем какой больше
				var rightExistence = true;
			}
			else {
				var rightExistence = false; // правого родителя нет
			}
			if(rightExistence) {
				if(node.priority < node.left.priority || node.priority < node.right.priority) {
					if(node.priority < node.left.priority) {   // если меньше левого ребенка
						if(isLeft) {  // если левый больше правого
							if(node == this.root)
								this.root = node.left;
							if(this.parentNodes.indexOf(node.left) >= 0) {
								if(this.parentNodes.indexOf(node) >= 0) {
									var tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
									var indexOfChild = this.parentNodes.indexOf(node.left);
									this.parentNodes[this.parentNodes.indexOf(node)] = node.left;
									this.parentNodes[indexOfChild] = tempNode;
								}
								else {
									this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
								}
							}
							node.left.swapWithParent();
						}
						else {    // если правый больше левого
							if(node == this.root)
								this.root = node.right;
							
							if(this.parentNodes.indexOf(node.right) >= 0) {
								if(this.parentNodes.indexOf(node) >= 0) {
									var tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
									var indexOfChild = this.parentNodes.indexOf(node.right);
									this.parentNodes[this.parentNodes.indexOf(node)] = node.right;
									this.parentNodes[indexOfChild] = tempNode;
								}
								else {
									this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
								}
							}
							node.right.swapWithParent();
						}
					}
					else { // если меньше правого, но больше левого
						if(node == this.root)
							this.root = node.right;
							
						if(this.parentNodes.indexOf(node.right) >= 0) {
							if(this.parentNodes.indexOf(node) >= 0) {
								var tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
								var indexOfChild = this.parentNodes.indexOf(node.right);
								this.parentNodes[this.parentNodes.indexOf(node)] = node.right;
								this.parentNodes[indexOfChild] = tempNode;
							}
							else {
								this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
							}
						}
						node.right.swapWithParent();
					}
					
				}
				this.shiftNodeDown(node);
			}
			else {
				if(node.priority < node.left.priority) {
					if(node == this.root)
						this.root = node.left;
				if(this.parentNodes.indexOf(node.left) >= 0) {
					if(this.parentNodes.indexOf(node) >= 0) {
						var tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
						var indexOfChild = this.parentNodes.indexOf(node.left);
						this.parentNodes[this.parentNodes.indexOf(node)] = node.left;
						this.parentNodes[indexOfChild] = tempNode;
					}
					else {
						this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
					}

				}	
					node.left.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
			
		}
	}
	}
}


module.exports = MaxHeap;
