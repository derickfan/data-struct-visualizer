import React, { useState, useEffect } from "react";
import "./App.css";
import Terminal from "./components/Terminal/Terminal";
import Display from "./components/Display/Display";
import Structure from "./lib/Structures";

const App = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const [structure, setStructure] = useState(Structure["LinkedList"]);

	const [nodes, setNodes] = useState([]);
	const [links, setLinks] = useState([]);

	const runCommand = (command) => {
		const args = command.trim().split(" ");
		const func = args.shift();
		console.log(func);
		if (!structure) {
			if (Structure[func]) {
				setStructure(Structure[func])
			}
		} else if (func === "help") {
			return printFunctions();
		} else if (structure.public[func]) {
			const res = structure.public[func]["func"](...args);
			setNodes(structure.private["toArray"]);
			setLinks(structure.private["getLinks"]);
			return res;
		} else {
			return "Command does not exist";
		}
	};

	const printFunctions = () => {
		const funcs = structure.public;
		console.log(funcs);
		const arr = Object.keys(funcs)
			.map((e) => {
				return funcs[e]["description"];
			})
		arr.unshift("List of Parameters");
		return arr.join("\r\n")
	};

	return (
		<div className="App">
			<Display nodes={nodes} links={links} windowSize={windowSize} />
			<Terminal runCommand={runCommand} />
		</div>
	);
};

export default App;
