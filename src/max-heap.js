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
		if(this.root !== null) {
			var detached = this.detachRoot();
			this.amount--;
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}
	}

	detachRoot() {
		var detached = this.root;
		if(this.parentNodes.indexOf(this.root) === 0)
			this.parentNodes.shift();
		this.root = null;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		if ((detached instanceof Node) === false) 
            return;
		if(detached !== null) {
            var node = this.parentNodes[this.parentNodes.length - 1];
            if(node) { //если куча не пустая    
                if(node.parent.right == node) { //если узел является правым ребенком
                    var isRightElement = true;
                    var parentOfRightElement = node.parent;
                }
                else
                    isRightElement = false;   
                node.remove(); //убираем элемент из кучи
                this.parentNodes.pop(); //убираем его из массива
                if(detached.left === null || detached.right === null) 
                    this.parentNodes.unshift(node); //если элемент станет корнем
                 else if(isRightElement) //если элемент не станет корнем и является правым ребенком
                    this.parentNodes.unshift(parentOfRightElement);
                this.root = node;
                this.root.left = detached.left;
                this.root.right = detached.right;
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
		return this.root === null ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.amount = 0;
		
	}

	insertNode(node) { // точно правильно
		if(this.root === null) {
			this.root = node;
			this.parentNodes[0] = this.root;
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if(node.parent.right === node)
				this.parentNodes.shift();
		}
	}																		

	shiftNodeUp(node) {

		if(node.parent != null && node.priority > node.parent.priority) { 
			if(node.parent === this.root)
				this.root = node;
			if(this.parentNodes.indexOf(node) != -1) {
				if(this.parentNodes.indexOf(node.parent) != -1) {
					let tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
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
    
    shiftNodeDown(node) {
        if(node !== null) {
            var swap,isLeft;
            function isRightOrLeft(node) {  //менять с правым,левым или не менять
                if(node.left !== null) {
                    if(node.right !== null) {
                        isLeft = node.left.priority > node.right.priority ? true : false;
                        if(isLeft) 
                            if(node.priority < node.left.priority)
                                swap = "left";
                            else
                                swap = "not";
                        else
                            if(node.priority < node.right.priority)
                                swap = "right";
                            else
                                swap = "not";
                    }
                    else 
                        if(node.priority < node.left.priority)
                            swap = "left";
                        else
                            swap = "not";
                }
                else
                    swap = "not";
            }
            var changeParentNodesAndSwap = (node, swap) => { //поддерживаем массив и перестанавливаем
                var children;
                switch(swap) {
                    case "left":
                        children = node.left;
                        break;
                    case "right":
                        children = node.right;
                        break;
                    case "not":
                        return;
                        break;
                }
                if(node === this.root)
                    this.root = children;
                if(this.parentNodes.indexOf(children) >= 0) {
                    if(this.parentNodes.indexOf(node) >= 0) {
                        let tempNode = this.parentNodes[this.parentNodes.indexOf(node)];
                        var indexOfChild = this.parentNodes.indexOf(children);
                        this.parentNodes[this.parentNodes.indexOf(node)] = children;
                        this.parentNodes[indexOfChild] = tempNode;
                    }
                    else {
                        this.parentNodes[this.parentNodes.indexOf(children)] = node;
                    }
                }
                children.swapWithParent();
            }

            isRightOrLeft(node);
            if(swap !== "not") {
                changeParentNodesAndSwap(node, swap);
                this.shiftNodeDown(node);
            }
        }
    }
}



module.exports = MaxHeap;
