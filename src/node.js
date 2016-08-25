class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left == null) {
			this.left = node;
			node.parent = this;
		}
		else if(this.left != null && this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(node === this.left) {
			this.left = null;
			node.parent = null;
		}
		else if(node === this.right) {
			this.right = null;
			node.parent = null;
		}
		else 
			throw new Error("Doesn't have child");
	}

	remove() {
		if(this.parent !== null)
			this.parent.removeChild(this);
	}

	swapWithParent() { 

		function swapIfNotHaveRightSisterRoot(node) {
	
			if(node.left !== null)
				node.left.parent = node.parent;
			if(node.right !== null)
				node.right.parent = node.parent;
			node.right = node.parent.right;
			node.left = node.parent;
			node.left.left = tmp.left;
			node.left.right = tmp.right;
			tmp.parent = node.parent.parent;
			node.parent.parent = node;
			node.parent = tmp.parent;
		}

		function swapIfHaveRightSisterRoot(node) {
		
			node.parent.right.parent = node;
			if(node.left !== null)
				node.left.parent = node.parent;
			if(node.right !== null)
				node.right.parent = node.parent;
			node.right = node.parent.right;
			node.left = node.parent;
			node.left.left = tmp.left;
			node.left.right = tmp.right;
			tmp.parent = node.parent.parent;
			node.parent.parent = node;
			node.parent = tmp.parent;
		}

		function swapIfNotHaveLeftSisterRoot(node) {

			if(node.left !== null)
				node.left.parent = node.parent;
			if(node.right !== null)
				node.right.parent = node.parent;
			node.right = node.parent;
			node.left = node.parent.left;
			node.right.right = tmp.right;
			node.right.left = tmp.left;
			tmp.parent = node.parent.parent;
			node.parent.parent = node;
			node.parent = tmp.parent;
		}

		function swapIfHaveLeftSisterRoot(node) {
			
			node.parent.left.parent = node;
			if(node.left !== null)
				node.left.parent = node.parent;
			if(node.right !== null)
				node.right.parent = node.parent;
			node.right = node.parent;
			node.left = node.parent.left;
			node.right.right = tmp.right;
			node.right.left = tmp.left;
			tmp.parent = node.parent.parent;
			node.parent.parent = node;
			node.parent = tmp.parent;

		}

		if (this.parent !== null) {   //если есть родитель
			var tmp = new Node(null, null); // временная переменаая
			tmp.left = this.left;
			tmp.right = this.right;
			tmp.parent = this.parent;
			if(this.parent.parent !== null) {       // если у родителя есть родитель

				if(this.parent.parent.left === this.parent) {      //если родитель узла является левым ребенком
					this.parent.parent.left = this;
				}

				else if(this.parent.parent.right === this.parent) {   // если родитель узла является правым ребенком
					this.parent.parent.right = this;
				}
			}
			else if(this.parent.parent === null) {     //если у родителя нет родителя
				this.parent.parent = null;
			}

			if(this.parent.right === null && this.parent.left === this) { //нету сестринского узла и сам узел слева
				swapIfNotHaveRightSisterRoot(this);
			}

			else  if (this.parent.right.parent === this.parent && this.parent.right !== this) { //если у узла есть сестринский узел и он справа
				swapIfHaveRightSisterRoot(this);
			}

			else if(this.parent.left === null && this.parent.right === this) { // нету сестр. узла и сам узел справа
				swapIfNotHaveLeftSisterRoot(this);
			}

			else if(this.parent.left.parent === this.parent && this.parent.left !== this) { //если у узла есть сестринский узел и он слева
				swapIfHaveLeftSisterRoot(this);
			}
		}
	}
}



module.exports = Node;