import React, { useState, useEffect } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Node from "../Node/Node";
import Link from "../Link/Link";
import "./Display.css";

const Display = (props) => {

	return (
		<div className="display">
			<Stage
                offset={{x: -60, y: -60}}
				width={props.windowSize.width / 2}
				height={props.windowSize.height}
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
