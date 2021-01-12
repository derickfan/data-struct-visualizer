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

	const [nodes, setNodes] = useState([]);
	const [links, setLinks] = useState([]);

	useEffect(() => {
		const onResize = (event) => {
			setWindowSize({
				width: event.target.innerWidth,
				height: event.target.innerHeight,
			});
		};

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<div className="app">
			<Display nodes={nodes} links={links} windowSize={windowSize} />
			<Terminal setLinks={setLinks} setNodes={setNodes} windowSize={windowSize} />
		</div>
	);
};

export default App;
