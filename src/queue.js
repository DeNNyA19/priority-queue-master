const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize)
			this.maxSize = maxSize;
		else
			this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.size() !== this.maxSize)
			this.heap.push(data, priority);
		else
			throw new Error("Queue has max size");
	}

	shift() {
		if(this.heap.size() !== 0)
			var removed = this.heap.pop();
		else
			throw new Error("Queue is empty");
		return removed;

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.size() === 0 ? true : false;
	}
}

module.exports = PriorityQueue;
