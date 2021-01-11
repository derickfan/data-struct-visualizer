const BinaryTree = () => {
	let root;
	let xStep = 800;
	let yStep = 200;

	const Node = (data) => {
		return {
			data: data,
			left: null,
			right: null,
			parent: null,
			depth: 0,
			x: 0,
			y: 0,
		};
	};

    // Trees with a depth above 4 will start to overlap
	const add = (data) => {
		const node = Node(data);
		if (!root) {
			root = node;
		} else {
			let temp = getParentNode(root, +data);
			node.y += temp.y + yStep;
			node.depth = temp.depth + 1;
			if (+data < +temp.data) {
				temp.left = node;
				node.x += temp.x - xStep / Math.pow(2, node.depth);
			} else if (+data > +temp.data) {
				temp.right = node;
				node.x += temp.x + xStep / Math.pow(2, node.depth);
			} else {
				return "Data already exists";
			}
			node.parent = temp;
		}
		return "Node successfully added";
	};

	const getRoot = () => {
		return root;
	};

	const printInOrder = (node = root, str = "") => {
		if (!node) return str;
		str += `${printInOrder(node.left, str)} ${node.data} ${printInOrder(
			node.right,
			str
		)}`;
		return str.trim();
	};

	const printPreOrder = (node = root, str = "") => {
		if (!node) return str;
		str += `${node.data}${printPreOrder(node.left, str)}${printPreOrder(
			node.right,
			str
		)}`;
		return str.trim();
	};

	const printPostOrder = (node = root, str = "") => {
		if (!node) return str;
		str += `${printPostOrder(node.left, str)} ${printPostOrder(
			node.right,
			str
		)} ${node.data}`;
		return str.trim();
	};

	const getParentNode = (node, data) => {
		if (+data < +node.data && node.left) {
			return getParentNode(node.left, +data);
		} else if (data > node.data && node.right) {
			return getParentNode(node.right, +data);
		}
		return node;
	};

	const toArray = (arr = [], node = root) => {
		if (!node) return arr;

		let data = (({ data, x, y }) => ({ data, x, y }))(node);
		arr.push(data);
		toArray(arr, node.left);
		toArray(arr, node.right);

		return arr;
	};

	const getLinks = (links = [], node = root) => {
		if (node) {
			let initX = node.x;
			let initY = node.y;

			if (node.left) {
				links.push([initX, initY, node.left.x, node.left.y]);
				getLinks(links, node.left);
			}
			if (node.right) {
				links.push([initX, initY, node.right.x, node.right.y]);
				getLinks(links, node.right);
			}
		}
		return links;
	};

	// return {
	//     add, printInOrder, printPostOrder, printPreOrder, getRoot
	// }

	const clear = () => {
		root = null;
		return "List has been cleared";
	};

	return {
		private: {
			toArray: toArray,
			getLinks: getLinks,
		},
		public: {
			add: {
				func: add,
				description: "add {data} - adds the data to the tree",
			},
			printInOrder: {
				func: printInOrder,
				description: "printInOrder - prints the list in order",
			},
			printPostOrder: {
				func: printPostOrder,
				description: "printPostOrder - prints the list in post order",
			},
			printPreOrder: {
				func: printPreOrder,
				description: "printPreOrder - prints the list in pre order",
			},
			getRoot: {
				func: getRoot,
				description: "getRoot - gets the root of the list",
			},
			clear: {
				func: clear,
				description: "clear - emptys the tree",
			},
		},
	};
};

export default BinaryTree;

// const tree = BinaryTree();

// console.log(tree.public.add.func(5));
// console.log(tree.public.add.func(1));
// console.log(tree.public.add.func(7));
// console.log(tree.public.add.func(2));
// console.log(tree.public.add.func(3));
// console.log(tree.public.add.func(4));
// let root = tree.public.getRoot.func();
// console.log(root)

// console.log("In Order: ");
// tree.printInOrder(tree.getRoot());
// console.log("Pre Order: ");
// tree.printPreOrder(tree.getRoot());
// console.log("Post Order: ");
// tree.printPostOrder(tree.getRoot());
