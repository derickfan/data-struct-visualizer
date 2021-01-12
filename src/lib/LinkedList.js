const LinkedList = () => {
	let size = 0;
	let head, tail;
	let step = 200;
	let maxX = 800;
	let minX = 0;

	const Node = (data) => {
		return {
			data: data,
			next: null,
			x: 0,
			y: 0,
		};
	};

	const add = (data, index = size) => {
		console.log(data, index);
		if (data === undefined) return "Parameter Required";

		if (index > size) return "Index Out of Bounds";

		const node = Node(data);

		// Adds to the head of the list
		if (+index === 0) {
			addFirst(node);
			// Adds at the tail
		} else if (+index === size) {
			addLast(node);
			// Adds at the specified index
		} else {
			addAtIndex(node, index);
		}

		size++;

		return "Node sucessfully added";
	};

	const addFirst = (node) => {
		node.x = 0;
		node.y = 0;

		// If list is empty
		if (!head) {
			head = node;
			tail = head;
		} else {
			node.next = head;
			head = node;
		}

		shift(node);
	};

	const addLast = (node) => {
		determinePosition(tail, node);

		tail.next = node;
		tail = node;
	};

	const addAtIndex = (node, index) => {
		let temp = head;
		console.log(index);
		while (+index > 1) {
			temp = temp.next;
			index--;
		}

		node.next = temp.next;
		temp.next = node;

		node.x = temp.x + step;

		shift(node);
	};

	const removeIndex = (index) => {
		let temp = head;
		if (+index > size - 1) {
			return "Index out of bounds";
		}

		if (+index === 0) {
			head = head.next;
			if (head) {
				head.x = 0;
				head.y = 0;
				shift(head);
			}
		} else {
			while (index > 1) {
				temp = temp.next;
				index--;
			}
			if (temp.next === tail) {
				tail = temp;
			}
			temp.next = temp.next.next;
			shift(temp);
		}
		size--;
		return "Node has been removed";
	};

	const toArray = () => {
		let node = head;
		let array = [];
		while (node) {
			const data = (({ data, x, y }) => ({ data, x, y }))(node);
			// const data = (({data}) => ({data}))(node);
			// const data = node.data;
			array.push(data);
			node = node.next;
		}
		return array;
	};

	const print = () => {
		let node = head;
		if (!node) return "Empty list";
		let array = [];
		while (node) {
			const data = node.data;
			array.push(data);
			node = node.next;
		}
		return array.join(", ");
	};

	const shift = (node) => {
		if (node && node.next === null) return;
		determinePosition(node, node.next);
		return shift(node.next);
	};

	const determinePosition = (prev, next) => {
		if (prev.x === (prev.y % (step * 2) === 0 ? maxX : minX)) {
			next.x = prev.x;
			next.y = prev.y + step;
		} else {
			next.x = prev.x + (prev.y % (step * 2) === 0 ? step : -step);
			next.y = prev.y;
		}
	};

	const clear = () => {
		head = null;
		tail = null;
		size = 0;
		return "List has been cleared";
	};

	const getLinks = () => {
		const links = [];
		let node = head;
		while (node && node.next) {
			let next = node.next;
			let initX = node.x;
			let initY = node.y;
			let endX = next.x;
			let endY = next.y;

			if (initY === endY) {
				initX += initX < endX ? 60 : -60;
				endX -= initX < endX ? 60 : -60;
			}
			if (initX === endX) {
				initY += 60;
				endY -= 60;
			}

			const link = [initX, initY, endX, endY];
			links.push(link);
			node = next;
		}

		return links;
	};

	const getSize = () => {
		return size;
	};

	return {
		private: {
			toArray: toArray,
			getLinks: getLinks,
		},
		public: {
			add: {
				function: add,
				description:
					"add {data} - appends the data to the end of the list\n\radd {data} {index} - inserts data at the specified index",
			},
			clear: { func: clear, description: "clear - empties the list" },
			print: {
				function: print,
				description: "print - prints the nodes into an array",
			},
			remove: {
				function: removeIndex,
				description:
					"remove {index} - removes at node at the specified index",
			},
			size: {
				function: getSize,
				description: "size - returns the size of the list",
			},
		},
	};
};

export default LinkedList;
