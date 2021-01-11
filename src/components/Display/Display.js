import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Node from "../Node/Node";
import Link from "../Link/Link";
import "./Display.css";

const Display = (props) => {

	const display = useRef(null);
	const [scale,setScale] = useState(1);
	const [stageX, setStageX] = useState(0);
	const [stageY, setStageY] = useState(0);

	const handleWheel = (e) => {
		const scaleBy = 1.1;
		const stage = e.target.getStage();
		const oldScale = stage.scaleX();
		// const mousePointTo = {
		// 	x: stage.getPointerPosition().x / oldScale - stage.x(),
		// 	y: stage.getPointerPosition().y / oldScale - stage.y()
		// }

		const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
		setScale(newScale);
		// setStageX(
		// 	-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
		// )
		// setStageY(
		// 	-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
		// )
	}


	useEffect(() => {
		console.log(display.current)
		setStageX(0)
		setStageY(0)
	}, [props.windowSize])

	return (
		<div className="display" ref={display}>
			<Stage
				// offset={{x: -60, y: -60}}
				onWheel={handleWheel}
				scaleX={scale}
				scaleY={scale}
				x={stageX}
				y={stageY}
				width={props.windowSize.width > 900 ? props.windowSize.width / 2 : props.windowSize.width}
				height={props.windowSize.width > 900 ? props.windowSize.height : props.windowSize.height / 2}
				draggable
			>
				<Layer>
                    {props.links.map((e) => {
                        return <Link points={e} />
                    })}
					{props.nodes.map((e) => {
						return <Node {...e} />;
					})}
				</Layer>
			</Stage>
		</div>
	);
};

export default Display;
