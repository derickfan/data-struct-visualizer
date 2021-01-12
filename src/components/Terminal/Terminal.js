import React, { useState, useEffect, useRef } from "react";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import Structure from "../../lib/Structures";
import "./Terminal.css";

const Terminal = (props) => {
	const [input, setInput] = useState("");
	const [fitAddon, setFitAddon] = useState(new FitAddon());
	const [structure, setStructure] = useState();
	const [methods, setMethods] = useState();

	const xterm = useRef(null);
	const userInput = useRef(null);
	// const term = React.useRef("terminal");

	useEffect(() => {
		const terminal = xterm.current.terminal;
		const fontSize = 20;

		terminal.setOption("fontSize", fontSize);
		terminal.setOption("cursorBlink", "block");
		terminal.setOption("theme", {
			selection: "brightBlack",
			background: "#101010",
			foreground: "white",
		});
		terminal.loadAddon(fitAddon);

		// console.log(xterm.current);

		terminal.write("Enter 'help' to get list a of commands\n\r");
	}, []);

	useEffect(() => {
		fitAddon.fit();
	}, [props.windowSize, FitAddon]);

	useEffect(() => {
		const keyPressListener = (event) => {
			const terminal = xterm.current.terminal;
			const key = event.domEvent.key;
			if (key === "Enter") {
				terminal.write("\r\n");
				const command = userInput.current.value;
				let res;
				if (Structure[command]) {
					setStructure(Structure[command])
					res = `${command} has been selected`;
				} else if (command === "exit") {
					setStructure();
					props.setNodes([]);
					props.setLinks([]);
					res = "Programm has been reset";
				} else {
					res = runCommand(command);
				}
				terminal.write(res + "\r\n");
				setInput("");
			} else if (key === "Backspace") {
				terminal.write("\b \b");
				setInput((input) => {
					return input.substring(0, input.length - 1);
				});
			} else {
				terminal.write(key);
				setInput((input) => {
					return input + key;
				});
			}
		};

		const dispose = xterm.current.terminal.onKey(keyPressListener).dispose;
		return () => {
			dispose();
		};
	}, [structure]);

	const runCommand = (input) => {
		const args = input.trim().split(" ");
		const command = args.shift();

		if (command === "help") {
			return structure ? printFunctions() : printDataStructure();
		} else if (structure.public[command]) {
			const res = structure.public[command]["function"](...args);
			props.setNodes(structure.private["toArray"]());
			props.setLinks(structure.private["getLinks"]());
			return res;
		} else {
			return "Command does not exist";
		}
	};

	const printFunctions = () => {
		const functions = structure.public;
		const arr = Object.keys(functions).map((e) => {
			return functions[e]["description"];
		});arr.push("exit - resets the program")
		
		arr.unshift("List of Parameters:");
		return arr.join("\r\n");
	};

	const printDataStructure = () => {
		return `List of Data Structures:\r\n${Object.keys(Structure).join("\r\n")}`;
	};

	return (
		<div className="terminal" id="terminal">
			<XTerm ref={xterm} />
			<input type="text" value={input} ref={userInput} />
		</div>
	);
};

export default Terminal;
