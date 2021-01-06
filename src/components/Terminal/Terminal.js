import React, { useState, useEffect } from "react";
import { XTerm } from "xterm-for-react";
import "./Terminal.css";

const Terminal = (props) => {
	const [input, setInput] = useState("");

	const xterm = React.useRef(null);
	const userInput = React.useRef(null);
	const term = React.useRef("terminal");

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

		terminal.resize(
			Math.floor((term.current.clientWidth / fontSize) * 1.6),
			Math.floor(window.innerHeight / fontSize / 2)
		);
		terminal.onKey(keyPressListener);

		terminal.write("Enter 'help' to get list a of commands\n\r")
	}, []);

	const keyPressListener = (event) => {
		const terminal = xterm.current.terminal;
		const key = event.domEvent.key;
		if (key === "Enter") {
			terminal.write("\r\n");
			const command = userInput.current.value;
			const res = props.runCommand(command);
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

	return (
		<div className="terminal" id="terminal" ref={term}>
			<XTerm ref={xterm} />
			<input type="text" value={input} ref={userInput} />
		</div>
	);
};

export default Terminal;
