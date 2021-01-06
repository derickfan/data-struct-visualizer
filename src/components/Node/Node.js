import React, { useState } from "react";
import { Circle, Text } from "react-konva";

const circleDefaults = {
    radius: 50,
    fill: "black",
    stroke: "grey",
    strokeWidth: 5,
}

const textDefaults = {
    width: circleDefaults.radius,
    height: circleDefaults.radius,
    offsetX: circleDefaults.radius / 2,
	offsetY: circleDefaults.radius / 2,
	verticalAlign: "middle",
	align: "center",
	stroke: "white",
	fill: "white",
	strokeWidth: 1,
	fontSize: 20,
}

const Node = (props) => {

    // const [x, setX] = useState(props.x);
    // const [y, setY] = useState(props.y);
    // const [data, setData] = useState(props.data)

    return (
        <>
            <Circle {...circleDefaults} x={props.x} y={props.y} />
            <Text {...textDefaults} x={props.x} y={props.y} text={props.data}/>
        </>
    );
}

export default Node;